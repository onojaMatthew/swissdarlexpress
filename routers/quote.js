const express = require("express");
const requireLogin = require("../config/auth");
const {
  create,
  getAllQuotes,
  getQuote,
  deleteQuote,
  updateQuote,
  hasView,
} = require("../controllers/quote");

const router = express.Router();

router.post("/post", create);
router.get("/all", requireLogin, getAllQuotes);
router.get("/single/:quoteId", requireLogin, getQuote);
router.put("/quote/:quoteId", requireLogin, updateQuote);
router.put("/quote/:shippingId", requireLogin, hasView);
router.delete("/quote/:quoteId", requireLogin, deleteQuote);

module.exports = router;
