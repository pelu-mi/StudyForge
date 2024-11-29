import quizService from "../services/quiz.service.js";


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



export default {
  updateAnsweredCorrectly,
  updateQuizCompletionStatus
};
