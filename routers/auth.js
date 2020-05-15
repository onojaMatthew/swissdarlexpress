const express = require("express");
const {
  recover,
  reset,
  resetPassword
} = require("../controllers/auth");

const router = express.Router();

router.put("/auth/recover", recover);
router.get("/auth/reset/:token", reset);
router.put("/auth/reset_password", resetPassword);

module.exports = router;