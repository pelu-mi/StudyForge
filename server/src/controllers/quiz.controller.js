/**
 * Import modules
 */
import quizService from "../services/quiz.service.js";

/**
 * updateAnsweredCorrectly - Update questions answered correctly
 * 
 * @param {object} req - Request object
 * @param {object} res - Response object
 */
async function updateAnsweredCorrectly(req, res) {
  try {
    const response = await quizService.updateAnsweredCorrectly(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to update quiz",
      status: "failure",
    });
  }
}

/**
 * updateQuizCompletionStatus - Update quiz completion status
 * 
 * @param {object} req - Request object
 * @param {object} res - Response object
 */
async function updateQuizCompletionStatus(req, res) {
    try {
      const response = await quizService.updateQuizCompletionStatus(req.body);
      res.status(response.statusCode).json(response);
    } catch (error) {
      res.status(500).json({
        message: "Unable to update quiz",
        status: "failure",
      });
    }
  }


/**
 * Export all fuctions
 */
export default {
  updateAnsweredCorrectly,
  updateQuizCompletionStatus
};
