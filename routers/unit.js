const express = require("express");
const requireLogin = require("../config/auth");
const {
  create,
  getUnit,
  updateUnit,
  deleteUnit
} = require("../controllers/unit");

const router = express.Router();

router.post("/unit/:userId/:role", requireLogin, create);
router.get("/unit", getUnit);
router.put("/unit/:role/:unitId", requireLogin, updateUnit);
router.delete("/unit/:role/:unitId", requireLogin, deleteUnit);

module.exports = router;