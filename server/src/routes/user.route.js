import express from "express";
import userControllers from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/createaccount", userControllers.createAccount);
router.post("/login", userControllers.login);
router.post(
  "/setkey",
  authMiddleware.authenticate,
  userControllers.createPublicKey
);
router.get("/getuser", authMiddleware.authenticate, userControllers.getUser);
router.post(
  "/updateuser",
  authMiddleware.authenticate,
  userControllers.updateUser
);
router.post(
  "/setstudyalert",
  authMiddleware.authenticate,
  userControllers.setStudyAlert
);

router.get(
  "/getuserstudyalerts",
  authMiddleware.authenticate,
  userControllers.getUserStudyAlerts
);

router.get("/getstudyalert/:alertId", userControllers.getStudyAlert);

router.post("/generateresource", userControllers.generateResource);

export default router;
