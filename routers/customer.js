const express = require("express");
const {
  getCustomers,
  deleteCustomer
} = require("../controllers/customer");
const requireLogin = require("../config/auth");

const router = express.Router();

router.get("/customer", requireLogin, getCustomers);
router.delete("/customer/delete/:customerId", requireLogin, deleteCustomer);

module.exports = router;