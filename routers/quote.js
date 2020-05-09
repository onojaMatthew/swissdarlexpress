const express = require("express");
const requireLogin = require("../config/auth");
const {
  create,
  getAllQuotes,
  getQuote,
  deleteQuote,
  updateQuote,
  hasView,
  approve,
  changeStatus,
} = require("../controllers/quote");

const router = express.Router();

router.post("/post", create);
router.get("/all", requireLogin, getAllQuotes);
router.get("/single/:quoteId", requireLogin, getQuote);
router.put("/quote/:quoteId", requireLogin, updateQuote);
router.put("/quote/approve/:shipmentId/:userId", requireLogin, approve);
router.put("/quote/status/:shipmentId/:userId", requireLogin, changeStatus);
router.put("/quote/view/:shippingId", requireLogin, hasView);
router.delete("/quote/:quoteId", requireLogin, deleteQuote);

module.exports = router;
