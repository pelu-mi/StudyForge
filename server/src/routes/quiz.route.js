/**
 * Import Modules
 */
import express from "express";
import quizController from "../controllers/quiz.controller.js";

// Define Router object for all /quiz routes
const router = express.Router();

// POST request to /updatequizanaswer
router.post("/updatequizanswer", quizController.updateAnsweredCorrectly);

// POST request to /updatequizcompletion
router.post("/updatequizcompletion", quizController.updateQuizCompletionStatus);

/**
 * Export router object
 */
export default router;
