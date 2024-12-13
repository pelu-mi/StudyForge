/**
 * Import Modules
 */
import mongoose, { Mongoose } from "mongoose";

/**
 * Define StudyAlert Model for database
 */
const studyAlertSchema = mongoose.Schema(
  {
    day: [
      {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        required: true,
      },
    ],
    time: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userEmail: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },

  {
    timestamps: true,
  }
);

/**
 * Export Study Alert Model
 */
export default mongoose.model("studyAlert", studyAlertSchema);
