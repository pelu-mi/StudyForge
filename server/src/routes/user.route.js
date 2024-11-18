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

router.get(
  "/getuserresources",
  authMiddleware.authenticate,
  userControllers.getUserResources
);

router.get("/getstudyalert/:alertId", userControllers.getStudyAlert);
router.get("/getresource/:resourceId", userControllers.getResource);

router.post("/deletestudyalert", userControllers.deleteStudyAlert);

router.post(
  "/forge",
  authMiddleware.authenticate,
  userControllers.generateResource
);
router.post(
  "/updatestudyalert",
  authMiddleware.authenticate,
  userControllers.updateStudyAlert
);

export default router;
