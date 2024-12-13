/**
 * Import Modules
 */
import express from "express";
import userControllers from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.js";
import multer from "multer";

// Define Router object for all /user routes
const router = express.Router();
const upload = multer({ dest: "uploads/" });

// POST request to /createaccount
router.post("/createaccount", userControllers.createAccount);
// POST request to /login
router.post("/login", userControllers.login);
// POST request to /setkey
router.post(
  "/setkey",
  authMiddleware.authenticate,
  userControllers.createPublicKey
);
// GET request to /getuser
router.get("/getuser", authMiddleware.authenticate, userControllers.getUser);
// POST request to /updateuser
router.post(
  "/updateuser",
  authMiddleware.authenticate,
  userControllers.updateUser
);
// POST request to /setstudyalert
router.post(
  "/setstudyalert",
  authMiddleware.authenticate,
  userControllers.setStudyAlert
);

// GET request to /getuserstudyalerts
router.get(
  "/getuserstudyalerts",
  authMiddleware.authenticate,
  userControllers.getUserStudyAlerts
);

// GET request to /getuserresources
router.get(
  "/getuserresources",
  authMiddleware.authenticate,
  userControllers.getUserResources
);

// GET request to /getstudyalert
router.get("/getstudyalert/:alertId", userControllers.getStudyAlert);
// GET request to /getresource
router.get("/getresource/:resourceId", userControllers.getResource);
// POST request to /deletestudyalert
router.post("/deletestudyalert", userControllers.deleteStudyAlert);
// POST request to /deleteresource
router.post("/deleteresource", userControllers.deleteResource);

// POST request to /forge
router.post(
  "/forge",
  authMiddleware.authenticate,
  userControllers.generateResource
);
// POST request to /updatestudyalert
router.post(
  "/updatestudyalert",
  authMiddleware.authenticate,
  userControllers.updateStudyAlert
);

// POST request to /upload
router.post(
  "/upload",
  upload.single("file"),
  userControllers.extractTextFromPDF
);

// GET request to /getuseroverview
router.get(
  "/getuseroverview",
  authMiddleware.authenticate,
  userControllers.getUserOverview
);

// GET request to /getrecentalertsandresources
router.get(
  "/getrecentalertsandresources",
  authMiddleware.authenticate,
  userControllers.getRecentResourcesAndAlerts
);

// POST request to /updateresource
router.post(
  "/updateresource",
  authMiddleware.authenticate,
  userControllers.updateResource
);

// POST request to /changepassword
router.post(
  "/changepassword",
  authMiddleware.authenticate,
  userControllers.changePassword
);

/**
 * Export Router Object
 */
export default router;
