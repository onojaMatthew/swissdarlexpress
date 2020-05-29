const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Resize = require("../middlware/Resize");

exports.createAccount = (req, res) => {
  const { email, password, fullname, phone } = req.body;

  if (!email) return res.status(400).json({ error: "Email field is required" });
  if (!password) return res.status(400).json({ error: "Password field is required" });
  if (!phone) return res.status(400).json({ error: "Your phone number is required" });
  if (!fullname) return res.status(400).json({ error: "Your full name is required" });

  User.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ error: "User already exists"});
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          if (!hashedPassword) return res.status(400).json({ error: "Server error. Try again"});
          const accountType = req.params.accountType;
          let newAccount = new User({
            email: req.body.email,
            password: hashedPassword,
            fullname: req.body.fullname,
            phone: req.body.phone,
            role: accountType === "admin" ? "super_admin" : "admin"
          });

          newAccount.save();
          res.json({ message: "Registration success" });
        })
        .catch(err => {
          res.status(400).json({ error: err.message});
        });
    })
    .catch(err => {
      res.status(400).json({ error: err.message});
    });
}

//=========================================================================
// Community account login
exports.accountLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "All input fields are required"});
  User.findOne({ email})
    .then(account => {
      if (!account) return res.status(400).json({ error: `User with the email ${email} does not exist`});
      return bcrypt.compare(password, account.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({ error: "Password do not match"});
          const token = account.generateToken();
          const { _id, fullname, phone, email, role } = account;
          res.cookie("token", token, { expires: new Date(new Date() + 64800000)})
          res.header("x-auth-token", token).json({token, user: { _id, fullname, phone, email, role }});
        });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById({ _id: userId})
    .then(user => {
      if (!user) return res.status(400).json({ error: "No records found" });
      res.json(user);
    })
    .catch(err => {
      res.status(400).json({ eror: err.message });
    });
}

exports.getAllUsers = (req, res) => {
  User.find({})
    .then(users => {
      if (!users) return res.status(400).json({ error: "No records found." });
      res.json(users);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.role = (req, res) => {
  const { userId, newRole } = req.params;
  const { role } = req.user;
  const roles = [ "super_admin", "admin" ];
  if (!userId || !newRole) return res.status(400).json({ error: "Invalid parameter value" });
  if (!roles.includes(role)) return res.status(400).json({ error: "Invalid role authorization" });
  if (role !== "super_admin") return res.status(400).json({ error: "You are not authorized for this operation" });

  User.findByIdAndUpdate({ _id: userId}, { $set: { role: newRole }}, { new: true })
    .then(user => {
      if (!user) return res.status(400).json({ error: "Failed to assign role" });
      res.json(user);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.deleteUser = (req, res) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ error: "Invalid parameter values" });
  User.findByIdAndRemove({ _id: userId })
    .then(user => {
      if (!user) return res.status(400).json({ error: "User not found" });
      res.json(user);
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

exports.photo = ( req, res, next ) => {
  const { communityId } = req.params;

  User.findById( { _id: communityId } )
    .then( account => {
      if ( !account ) return res.status( 400 ).json( { error: "User not found" } );
      
      res.set( "Content-Type", account.photo.ContentType );
      res.send( account.photo.data );
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } );
}

/**
 * Uploads profile photos
 */
exports.uploadPhoto = ( req, res ) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ error: "Invalid parameters" });
  // Assigned the path to a new constant @photo
  User.findByIdAndUpdate( { _id: userId } )
    .then( async (account) => {
      if ( !account ) return res.status( 400 ).json( { error: "Can not find user" } );
      const filePath = new Resize(req.file.path);
      account.photo.data = filePath(req.file.buffer)// fs.readFileSync( req.file.path );
      account.photo.ContentType = "image/jpg";
      await account.save();
      res.json( account );
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } );
}

exports.logout = (req, res) => {
  res.clearCookie("token").json("You have logged out");
}
