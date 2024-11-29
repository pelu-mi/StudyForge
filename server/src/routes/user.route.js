import express from "express";
import userControllers from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

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

router.post("/deleteresource", userControllers.deleteResource);

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

router.post(
  "/upload",
  upload.single("file"),
  userControllers.extractTextFromPDF
);

router.get(
  "/getuseroverview",
  authMiddleware.authenticate,
  userControllers.getUserOverview
);

router.get(
  "/getrecentalertsandresources",
  authMiddleware.authenticate,
  userControllers.getRecentResourcesAndAlerts
);

router.post(
  "/updateresource",
  authMiddleware.authenticate,
  userControllers.updateResource
);

router.post(
  "/changepassword",
  authMiddleware.authenticate,
  userControllers.changePassword
);

export default router;
