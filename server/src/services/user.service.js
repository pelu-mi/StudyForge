import users from "../models/user.model.js";
import response from "../utils/response.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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

export default {
  createAccount,
  login,
};
