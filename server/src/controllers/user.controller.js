import usersServices from "../services/user.service.js";

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
    const response = await usersServices.updateUser(req.user);
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

export default {
  createAccount,
  login,
  createPublicKey,
  getUser,
  updateUser,
  setStudyAlert,
};
