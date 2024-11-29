import express from "express";
import quizController from "../controllers/quiz.controller.js";

const router = express.Router();

router.post("/updatequizanswer", quizController.updateAnsweredCorrectly);

router.post("/updatequizcompletion", quizController.updateQuizCompletionStatus);

export default router;
