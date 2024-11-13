import mongoose from "mongoose";

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
    studyAlert: {
      day: [
        {
          type: String,
        },
      ],
      time: {
        type: String ,
      },
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
