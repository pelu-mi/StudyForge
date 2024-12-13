/**
 * Import Modules
 */
import responses from "../utils/response.js";
import resource from "../models/resource.model.js";

/**
 * updateAnsweredCorrectly - Update questions answered correctly
 *
 * @param {Object} payload - Data to use
 * @returns Success or failure status
 */
async function updateAnsweredCorrectly(payload) {
  const { resourceID, quizID, data } = payload;

  // Specify allowed values
  const allowedValues = ["wrong", "correct", "not attempt"];
  if (!allowedValues.includes(data)) {
    return responses.buildFailureResponse(
      "Invalid value for isAnsweredCorrectly",
      400
    );
  }

  // Find quiz using resourceID
  const foundQuiz = await resource.findOne({ _id: resourceID });
  if (!foundQuiz) {
    return responses.buildFailureResponse("This quiz doesn't exist", 400);
  }

  // Update resource
  const updatedResource = await resource.updateOne(
    {
      _id: resourceID,
    },
    {
      $set: {
        "quiz.$[quiz].isAnsweredCorrectly": data,
      },
    },
    {
      arrayFilters: [{ "quiz._id": quizID }],
    }
  );

  // Get updated field
  const updatedField = await resource.findById(resourceID, {
    quiz: 1,
  });

  if (!updatedResource) {
    return responses.buildFailureResponse(
      "Quiz not found or update failed",
      404
    );
  }

  return responses.buildSuccessResponse(
    "Quiz updated successfully",
    200,
    updatedField
  );
}

/**
 * updateQuizCompletionStatus - Update quiz completion status
 *
 * @param {Object} payload - Data to use
 * @returns Success or failure status
 */
async function updateQuizCompletionStatus(payload) {
  const { resourceID, data } = payload;
  const foundResource = await resource.findById(resourceID);
  if (!foundResource) {
    return responses.buildFailureResponse("Resource not found", 400);
  }

  // Set the isQuizCompleted filed in the resource
  const updatedResource = await resource.updateOne(
    {
      _id: resourceID,
    },
    {
      $set: {
        isQuizCompleted: data, // Set the isQuizCompleted field
      },
    }
  );

  // Get the updated field
  const updatedField = await resource.findById(resourceID, {
    isQuizCompleted: 1,
  });

  return responses.buildSuccessResponse(
    "Quiz updated succesfully",
    200,
    updatedField
  );
}

/**
 * Export all functions
 */
export default {
  updateAnsweredCorrectly,
  updateQuizCompletionStatus,
};
