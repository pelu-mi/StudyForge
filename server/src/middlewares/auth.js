/**
 * Import modules
 */
import user from "../models/user.model.js";
import jwt from "jsonwebtoken";
const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    // Validate JWT
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(400).json({
        message: "Authorization header must start with 'Bearer '",
        status: "failure",
      });
    }
    const token = authorization.substring(7);

    const decodedUser = await jwt.decode(token);

    const foundUser = await user.findOne({ _id: decodedUser._id });

    req.user = foundUser;
    next();
  } catch (error) {
    return res
      .status(error?.statusCode || 500)
      .send(error?.message || "Unable to authenticate");
  }
};

/**
 * Export all functions
 */

export default {
  authenticate,
};
