const mongoose = require("mongoose");
const { Schema } = mongoose;

const unitSchema = new Schema({
  amount: { type: Number, required: true },
  unit: { type: String, required: true }
});

const Unit = mongoose.model("Unit", unitSchema);

exports.Unit = Unit;