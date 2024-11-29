import usersServices from "../services/user.service.js";
import extract from "../utils/extractText.js";

async function createAccount(req, res) {
  try {
    const response = await usersServices.createAccount(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create account",
      status: "failure",
    });
  }
}

async function login(req, res) {
  try {
    const response = await usersServices.login(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to login",
      status: "failure",
    });
  }
}

async function createPublicKey(req, res) {
  try {
    const response = await usersServices.createPublicKey(req.user, req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to add public key",
      status: "failure",
    });
  }
}

async function verifyKey(req, res) {
  try {
    const response = await usersServices.verifyKey(req.user, req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to verify public key",
      status: "failure",
    });
  }
}

async function getUser(req, res) {
  try {
    const response = await usersServices.getUser(req.user);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get user",
      status: "failure",
    });
  }
}

async function updateUser(req, res) {
  try {
    const response = await usersServices.updateUser(req.user, req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to update user",
      status: "failure",
    });
  }
}

async function setStudyAlert(req, res) {
  try {
    const response = await usersServices.setStudyAlert(req.user, req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to set alert",
      status: "failure",
    });
  }
}

async function generateResource(req, res) {
  try {
    const response = await usersServices.generateResource(req.user, req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to generate resource",
      status: "failure",
    });
  }
}

async function getUserStudyAlerts(req, res) {
  try {
    const response = await usersServices.getUserStudyAlerts(req.user);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get alerts",
      status: "failure",
    });
  }
}
async function getUserResources(req, res) {
  try {
    const response = await usersServices.getUserResources(req.user);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get resources",
      status: "failure",
    });
  }
}

async function getStudyAlert(req, res) {
  try {
    const response = await usersServices.getStudyAlert(req.params);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get alert",
      status: "failure",
    });
  }
}

async function deleteStudyAlert(req, res) {
  try {
    const response = await usersServices.deleteStudyAlert(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete alert",
      status: "failure",
    });
  }
}

async function deleteResource(req, res) {
  try {
    const response = await usersServices.deleteResource(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete resource",
      status: "failure",
    });
  }
}

async function updateStudyAlert(req, res) {
  try {
    const response = await usersServices.updateStudyAlert(req.user, req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to update alert",
      status: "failure",
    });
  }
}

async function getResource(req, res) {
  try {
    const response = await usersServices.getResource(req.params);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get resource",
      status: "failure",
    });
  }
}

const extractTextFromPDF = async (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  try {
    // Extract text from the uploaded PDF
    const extractedText = await extract.extractTextFromPDF(file.path);

    // Remove the temporary file
    extract.deleteFile(file.path);

    res
      .status(200)
      .json({ message: "PDF text saved successfully", data: extractedText });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing PDF");
  }
};

async function getUserOverview(req, res) {
  try {
    const response = await usersServices.getUserOverview(req.user);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get overview",
      status: "failure",
    });
  }
}

async function getRecentResourcesAndAlerts(req, res) {
  try {
    const response = await usersServices.getRecentResourcesAndAlerts(req.user);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get overview",
      status: "failure",
    });
  }
}


async function updateResource(req, res) {
  try {
    const response = await usersServices.updateResource(req.user,req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to update resource",
      status: "failure",
    });
  }
}


async function changePassword(req, res) {
  try {
    const response = await usersServices.changePassword(req.user,req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Unable to change password",
      status: "failure",
    });
  }
}

export default {
  createAccount,
  login,
  createPublicKey,
  getUser,
  updateUser,
  setStudyAlert,
  generateResource,
  getUserStudyAlerts,
  getStudyAlert,
  deleteStudyAlert,
  updateStudyAlert,
  getResource,
  getUserResources,
  deleteResource,
  extractTextFromPDF,
  getUserOverview,
  getRecentResourcesAndAlerts,
  updateResource,
  changePassword
};
