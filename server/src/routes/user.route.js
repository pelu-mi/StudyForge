import express from "express";
import userControllers from "../controllers/user.controller.js";

const router = express.Router();

router.post("/createaccount", userControllers.createAccount);
router.post("/login", userControllers.login);

export default router;
