const mongoose = require("mongoose");
const { Schema } = mongoose;

const quoteSchema = new Schema({
  amount: { type: Number, required: true },
  companyName: { type: String, required: true },
  contactLName: { type: String, required: true },
  contactFName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  pickupAddress: { type: String, require: true },
  pickupCity: { type: String, require: true },
  approve: { type: Boolean, default: false },
  pickupState: { type: String, require: true },
  destinationAddress: { type: String, require: true },
  destinationCity: { type: String, require: true },
  destinationState: { type: String, require: true },
  packageInfo: { type: String, required: true },
  weight: { type: String, required: true },
  isView: { type: Boolean, default: false },
  dimension: { type: String, required: true },
  specialInstruction: { type: String, required: true },
  status: { type: String, enum: [ "refused", "delivered_to_driver", "delivered_to_receiver", "returned" ], default: "pending" },
  numOfPieces: { type: String, required: true },
  trackingNumber: { type: String, required: true },
  delivered: { type: Boolean, default: false },
  paid: { type: Boolean, default: false },
  unit: { type: String, },
  createdAt: { type: Date, default: Date.now() }
});

const Quote = mongoose.model("Quote", quoteSchema);

exports.Quote = Quote;