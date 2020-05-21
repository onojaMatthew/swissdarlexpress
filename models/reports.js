const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const reportSchema = new Schema({
  reporter: { type: ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  report: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Report = mongoose.model("Report", reportSchema);

exports.Report = Report;