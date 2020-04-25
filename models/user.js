const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const userSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  photo: { data: Buffer, ContentType: String },
  role: { type: String, enum: [ "super_admin", "admin" ], default: "admin" },
  createdAt: { type: Date, default: Date.now }
});

userSchema.methods.generateToken = function() {
  const token = jwt.sign({ _id: this._id, 
    email: this.email, 
    password: this.password,
    role: this.role
  }, process.env.SECRETKEY);
  return token;
}

const User = mongoose.model("User", userSchema);

exports.User = User;