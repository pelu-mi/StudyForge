import responses from "../utils/response.js";
import resource from "../models/resource.model.js";

async function updateAnsweredCorrectly(payload) {
  const { resourceID, quizID, data } = payload;

  const foundQuiz = await resource.findOne({ _id: resourceID });
  if (!foundQuiz) {
    return responses.buildFailureResponse("This quiz doesn't exist", 400);
  }

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

async function updateQuizCompletionStatus(payload) {
  const { resourceID, data } = payload;
  const foundResource = await resource.findById(resourceID);
  if (!foundResource) {
    return responses.buildFailureResponse("Resource not found", 400);
  }

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

  const updatedField = await resource.findById(resourceID, {
    isQuizCompleted: 1,
  });

  return responses.buildSuccessResponse(
    "Quiz updated succesfully",
    200,
    updatedField
  );
}

export default {
  updateAnsweredCorrectly,
  updateQuizCompletionStatus,
};
