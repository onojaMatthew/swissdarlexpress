const express = require("express");
const requireLogin = require("../config/auth");
const { userValidationRules } = require("../middlware/validator");
const {
  createAccount,
  accountLogin,
  getAllUsers,
  getUser,
  deleteUser,
  logout,
  photo,
  uploadPhoto,
  role
} = require("../controllers/user");
const { upload } = require("../middlware/fileupload");

const router = express.Router();

router.post("/user", createAccount);
router.get("/users", requireLogin, getAllUsers);
router.post("/login", accountLogin);
router.get("/user/:userId", requireLogin, getUser);
router.get("/logout", logout);
router.put("/profile/photo", requireLogin, upload.single("image"), uploadPhoto);
router.put("/role/:userId/:newRole", requireLogin, role)
router.get("/photo/:userId", photo);
router.delete("/user/delete/:userId", requireLogin, deleteUser);

module.exports = router;