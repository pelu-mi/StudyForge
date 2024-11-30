import mongoose from "mongoose";

const resourceSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
    },
    topic: {
      type: String,
    },
    field: {
      type: String,
    },
    levelOfStudy: {
      type: String,
      enum: ["High School", "Undergraduate", "Graduate"],
    },
    numberOfQuestions: {
      type: Number,
    },
    sourceType: {
      type: String,
      enum: ["File", "Text"],
      default: "File",
    },
    fileSource: {
      type: String,
    },
    textSource: {
      type: String,
    },
    generatedTextFromFile: {
      type: String,
    },
    summary: {
      type: String,
    },
    keyConcepts: [
      {
        concept: {
          type: String,
        },
        concept_summary: {
          type: String,
        },
      },
    ],
    isQuizCompleted: {
      type: Boolean,
      default: false,
    },
    quiz: [
      {
        question: {
          type: String,
        },
        option_A: {
          type: String,
        },
        option_B: {
          type: String,
        },
        option_C: {
          type: String,
        },
        option_D: {
          type: String,
        },
        correct_option: {
          type: String,
        },
        isAnsweredCorrectly: {
          type: String,
          enum: ["wrong", "correct", "not attempt"],
          default: "not attempt",
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Resource", resourceSchema);
