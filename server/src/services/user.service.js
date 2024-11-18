import dotenv from "dotenv";
import users from "../models/user.model.js";
import responses from "../utils/response.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import parseTextWithGPT from "../utils/generateResource.js";
import studyAlert from "../models/studyAlert.js";
import resource from "../models/resource.model.js";

dotenv.config();

async function createAccount(payload) {
  const { firstName, lastName, email } = payload;

  if (!firstName || !lastName || !payload.password || !email) {
    return responses.buildFailureResponse("Missing required fields", 400);
  }

  const foundEmail = await users.findOne({ email: email });
  if (foundEmail) {
    return responses.buildFailureResponse("Account already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  payload.password = hashedPassword;

  const newUser = await users.create(payload);
  return responses.buildSuccessResponse(
    "Account created succesfully",
    201,
    newUser
  );
}

async function login(payload) {
  const { email, password } = payload;
  const foundAccount = await users.findOne({ email: email }).lean();
  if (!foundAccount) {
    return responses.buildFailureResponse("Account does not exist", 400);
  }

  const passwordMatch = await bcrypt.compare(password, foundAccount.password);
  if (!passwordMatch) {
    return responses.buildFailureResponse("Passwords do not match", 400);
  }
  const token = jwt.sign(
    {
      _id: foundAccount._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    }
  );

  foundAccount.accessToken = token;
  return responses.buildSuccessResponse("Login Successful", 200, foundAccount);
}

async function createPublicKey(user, payload) {
  const { publicKey } = payload;

  const foundUser = await users.findOne({ _id: user._id });

  if (!foundUser) {
    return responses.buildFailureResponse("User does not exist", 400);
  }

  const updatedUser = await users.findOneAndUpdate(
    { _id: user._id },
    { $set: { publicKeyCredential: publicKey } },
    { returnDocument: "after" } // Ensures it returns the updated document
  );

  return responses.buildSuccessResponse(
    "Public key added successfully",
    200,
    updatedUser
  );
}

async function getUser(payload) {
  const foundUser = await users.findOne({ _id: payload });

  if (!foundUser) {
    return responses.buildFailureResponse("User does not exist", 400);
  }

  return responses.buildSuccessResponse("User details found", 200, foundUser);
}

async function updateUser(user, payload) {
  const currentUser = await users.findById(user._id);
  if (!currentUser) {
    return responses.buildFailureResponse("User not found", 400);
  }

  const updatedUser = await users.findByIdAndUpdate(
    user._id,
    { $set: payload },
    { new: true, useFindAndModify: false }
  );

  return responses.buildSuccessResponse(
    "User updated successfully",
    200,
    updatedUser
  );
}

async function setStudyAlert(user, payload) {
  const currentUser = await users.findById(user._id);
  if (!currentUser) {
    return responses.buildFailureResponse("User not found", 400);
  }

  payload.user = user._id;

  const existingAlert = await studyAlert.findOne({
    user: user._id,
    day: { $in: payload.day },
    time: payload.time,
  });

  if (existingAlert) {
    return responses.buildFailureResponse(
      "A study alert with the same day and time already exists",
      409
    );
  }

  const newAlert = await studyAlert.create(payload);

  return responses.buildSuccessResponse(
    "Study alert updated successfully",
    200,
    newAlert
  );
}

async function getUserStudyAlerts(user) {
  const foundUser = await users.findOne({ _id: user._id });

  if (!foundUser) {
    return responses.buildFailureResponse("User does not exist", 400);
  }

  const foundAlert = await studyAlert.find({ user: user._id });
  if (!foundAlert) {
    return responses.buildFailureResponse("No study alert set", 400);
  }
  return {
    message: "Study alert displayed below",
    statusCode: 200,
    status: "success",
    data: foundAlert,
  };
}

async function deleteStudyAlert(payload) {
  const foundAlert = await studyAlert.findOne({ _id: payload.id });
  if (!foundAlert) {
    return responses.buildFailureResponse("This alert doesn't exist", 400);
  }

  const deletedAlert = await studyAlert.findOneAndDelete({ _id: payload.id });

  return responses.buildSuccessResponse(
    "Alert deleted succesfully",
    200,
    deletedAlert
  );
}

async function updateStudyAlert(user, payload) {
  const foundAlert = await studyAlert.findOne({ _id: payload.id });
  if (!foundAlert) {
    return responses.buildFailureResponse("This alert doesn't exist", 400);
  }

  const updatedAlert = await studyAlert.findByIdAndUpdate(
    payload.id,
    { $set: payload },
    { new: true, runValidators: true }
  );

  return responses.buildSuccessResponse(
    "Updated succesfully",
    200,
    updatedAlert
  );
}

async function getStudyAlert(payload) {
  const { alertId } = payload;
  const foundAlert = await studyAlert.findOne({ _id: alertId });
  if (!foundAlert) {
    return responses.buildFailureResponse("This alert doesn't exist", 400);
  }

  return responses.buildSuccessResponse("Study alert found", 200, foundAlert);
}

async function verifyKey(user, payload) {
  const foundUser = await users.findOne({ _id: user._id });

  if (!foundUser) {
    return responses.buildFailureResponse("User does not exist", 400);
  }

  const { publicKeyCredential } = user;

  const verifier = crypto.createVerify("RSA-SHA256");
  verifier.update(payload);

  const isVerified = verifier.verify(
    `-----BEGIN PUBLIC KEY-----\n${publicKeyCredential}\n-----END PUBLIC KEY-----`,
    signature,
    "base64"
  );

  if (!isVerified) {
    return responses.buildFailureResponse(
      "Unfortunately we could not verify your Face ID authentication",
      400
    );
  }

  return responses.buildSuccessResponse("Face ID verified", 200);
}

async function generateResource(user, payload) {
  const {
    title,
    topic,
    field,
    levelOfStudy,
    numberOfQuestions,
    sourceType,
    textSource,
    fileSource,
    generatedTextfromFile,
  } = payload;

  const sourceText = sourceType == "File" ? generatedTextfromFile : textSource;
  const generatedResponse = await parseTextWithGPT(
    sourceText,
    numberOfQuestions
  );

  payload.userID = user._id;
  payload.summary = generatedResponse.summary;
  payload.keyConcepts = generatedResponse.key_concepts;
  payload.quiz = generatedResponse.quiz;

  const newResource = await resource.create(payload);
  return responses.buildSuccessResponse(
    "Resource generated succesfully",
    201,
    newResource
  );
}

async function getResource(payload) {
  const { resourceId } = payload;
  const foundResource = await resource.findOne({ _id: resourceId });
  if (!foundResource) {
    return responses.buildFailureResponse("This resource doesn't exist", 400);
  }

  return responses.buildSuccessResponse("Resource found", 200, foundResource);
}

async function getUserResources(user) {
  const foundUser = await users.findOne({ _id: user._id });

  if (!foundUser) {
    return responses.buildFailureResponse("User does not exist", 400);
  }

  const foundResources = await resource.find({ userID: user._id });
  if (!foundResources) {
    return responses.buildFailureResponse("No resources for this user", 400);
  }
  return {
    message: "Resources displayed below",
    statusCode: 200,
    status: "success",
    data: foundResources,
  };
}
export default {
  createAccount,
  login,
  createPublicKey,
  getUser,
  updateUser,
  setStudyAlert,
  verifyKey,
  generateResource,
  getUserStudyAlerts,
  getStudyAlert,
  deleteStudyAlert,
  updateStudyAlert,
  getResource,
  getUserResources,
};
