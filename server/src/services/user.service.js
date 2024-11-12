import users from "../models/user.model.js";
import response from "../utils/response.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

async function createAccount(payload) {
  const { firstName, lastName, email } = payload;

  if (!firstName || !lastName || !payload.password || !email) {
    return response.buildFailureResponse("Missing required fields", 400);
  }

  const foundEmail = await users.findOne({ email: email });
  if (foundEmail) {
    return response.buildFailureResponse("Account already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  payload.password = hashedPassword;

  const newUser = await users.create(payload);
  return response.buildSuccessResponse(
    "Account created succesfully",
    201,
    newUser
  );
}

async function login(payload) {
  const { email, password } = payload;
  const foundAccount = await users.findOne({ email: email }).lean();
  if (!foundAccount) {
    return response.buildFailureResponse("Account does not exist", 400);
  }

  const passwordMatch = await bcrypt.compare(password, foundAccount.password);
  if (!passwordMatch) {
    return response.buildFailureResponse("Passwords do not match", 400);
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
  return response.buildSuccessResponse("Login Successful", 200, foundAccount);
}

async function createPublicKey(user, payload) {
  const { publicKey } = payload;

  const foundUser = await users.findOne({ _id: user._id });

  if (!foundUser) {
    return response.buildFailureResponse("User does not exist", 400);
  }

  const updatedUser = await users.findOneAndUpdate(
    { _id: user._id },
    { $set: { publicKeyCredential: publicKey } },
    { returnDocument: "after" } // Ensures it returns the updated document
  );

  return response.buildSuccessResponse(
    "Public key added successfully",
    200,
    updatedUser
  );
}

async function getUser(payload) {
  const foundUser = await users.findOne({ _id: payload });

  if (!foundUser) {
    return response.buildFailureResponse("User does not exist", 400);
  }

  return response.buildSuccessResponse("User details found", 200, foundUser);
}

async function updateUser(payload) {
  const currentUser = await users.findById(payload._id);
  if (!currentUser) {
    return response.buildFailureResponse("User not found", 400);
  }

  const updatedUser = await users.findByIdAndUpdate(
    payload._id,
    { $set: payload }, // Update the fields provided in the payload
    { new: true, useFindAndModify: false }
  );

  return response.buildSuccessResponse(
    "User updated successfully",
    200,
    updatedUser
  );
}

async function setStudyAlert(user, payload) {
  const currentUser = await users.findById(user._id);
  if (!currentUser) {
    return response.buildFailureResponse("User not found", 400);
  }

  const alert = await users.findByIdAndUpdate(
    user._id,
    {
      $set: { "studyAlert.day": payload.day, "studyAlert.time": payload.time },
    }, // target studyAlert fields
    { new: true, useFindAndModify: false }
  );

  return response.buildSuccessResponse(
    "Study alert updated successfully",
    200,
    alert.studyAlert
  );
}

async function verifyKey(user, payload) {
  const foundUser = await users.findOne({ _id: user._id });

  if (!foundUser) {
    return response.buildFailureResponse("User does not exist", 400);
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
    return response.buildFailureResponse(
      "Unfortunately we could not verify your Face ID authentication",
      400
    );
  }

  return response.buildSuccessResponse("Face ID verified", 200);
}
export default {
  createAccount,
  login,
  createPublicKey,
  getUser,
  updateUser,
  setStudyAlert,
  verifyKey,
};
