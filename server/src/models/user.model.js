/**
 * Import Modules
 */
import mongoose from "mongoose";

/**
 * Define User model for database
 */
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    publicKeyCredential: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

/**
 * Export User model
 */
export default mongoose.model("User", userSchema);
