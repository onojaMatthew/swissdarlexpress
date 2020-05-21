const express = require("express");
const {
  postReport,
  getReports,
  deleteReport
} = require("../controllers/report");
const requireLogin = require("../config/auth");

const router = express.Router();

router.post("/report", requireLogin, postReport);
router.get("/report", requireLogin, getReports);
router.delete("/report/delete/:reportId", requireLogin, deleteReport);

module.exports = router;