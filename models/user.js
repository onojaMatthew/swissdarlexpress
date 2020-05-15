const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { Schema } = mongoose;

const userSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  photo: { data: Buffer, ContentType: String },
  role: { type: String, enum: [ "super_admin", "admin" ], default: "admin" },
  createdAt: { type: Date, default: Date.now },
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpires: { type: Date, required: false }
}, {timestamps: true});

userSchema.methods.generateToken = function() {
  const token = jwt.sign({ _id: this._id, 
    email: this.email, 
    password: this.password,
    role: this.role
  }, process.env.SECRETKEY);
  return token;
}

userSchema.methods.generatePasswordReset = function() {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

const User = mongoose.model("User", userSchema);

exports.User = User;