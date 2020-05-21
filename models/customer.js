const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema({
  company: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

exports.Customer = Customer;