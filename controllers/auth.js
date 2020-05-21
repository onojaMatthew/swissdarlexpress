const { User } = require("../models/user");
const { sendEmail } = require("../services/mailer");
const bcrypt = require("bcrypt");

// @desc Recover Password - Generates token and Sends password reset email
// @access Public
exports.recover = (req, res) => {
  User.findOne({ email: req.body.email})
    .then(user => {
      if (!user) return res.status(401).json({ error: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

      //Generate and set password reset token
      user.generatePasswordReset();

      // Save the updated user object
      user.save()
        .then(user => {
          // send email
          let link = "http://" + req.headers.host + "/v1/auth/reset/" + user.resetPasswordToken
          const receiver = user.email;
          const sender = "ecommerce@swissdarl.com";
          const subject = "Password change request"
          const message = `Hi ${user.fullname} \n 
          You sent a password reset request. Please click on the following link ${link} to reset your password. \n\n 
          If you did not request this, please ignore this email and your password will remain unchanged.\n`;

          const data = {
            receiver,
            sender,
            subject,
            message
          }
          sendEmail(data);
          return res.status(200).json({ message: 'A reset email has been sent to ' + user.email });
        })
        .catch(err => {
          res.status(500).json({ error: err.message});
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err.message })
    });
};

// @route POST api/auth/reset
// @desc Reset Password - Validate password reset token and shows the password reset view
// @access Public
exports.reset = (req, res) => {
  User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() }})
    .then((user) => {
        if (!user) return res.status(401).json({ error: 'Password reset token is invalid or has expired.'});

        //Redirect user to form with the email address
        res.redirect("http://" + req.headers.host + "/change_password/" + user.resetPasswordToken);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err.message})
    });
};


// @route POST api/auth/reset
// @desc Reset Password
// @access Public
exports.resetPassword = (req, res) => {
  User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: {$gt: Date.now()} })
      .then((user) => {
          if (!user) return res.status(401).json({ error: 'Password reset token is invalid or has expired.'});
        return bcrypt.hash(req.body.password, 12)
          .then(hashPassword => {
            //Set the new password
            user.password = hashPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            // Save
            user.save((err, doc) => {
              if (err) return res.status(500).json({ error: err.message});

              // send email
              const receiver = user.email;
              const sender = "ecommerce@swissdarl.com";
              const subject = "Password change request";
              const message = `Hi ${user.fullname} \n 
              This is a confirmation that the password for your account ${user.email} has just been changed.\n`;

              const data = {
                receiver,
                sender,
                subject,
                message
              }
              sendEmail(data);
              res.status(200).json({ message: 'Your password has been updated.'});
            });
          })
      })
      .catch(err => {
        return res.status(400).json({ error: err.message });
      });
};