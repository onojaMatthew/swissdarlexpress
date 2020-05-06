const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const winston = require("winston");
const db = require("./config/db");
const path = require("path");
const validator = require("express-validator");
// const fs = require("fs");

require("dotenv").config();
const {
  NODE_ENV,
  PORT,
} = process.env;

const port = PORT || 4300;
const hostname = "";
//===========================================================================
// Instantiating the express application
const app = express();

//===========================================================================
// Connecting to the database
db();

app.use(express.static(path.join(__dirname, "/client/build")));

//============================================================================
// Setting up middlewares
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit : "50mb" , extended : true , parameterLimit : 500000 }))
app.use(validator());
app.use(cookieParser());

//==================================================
// Setting up Cross Origin Resource Sharing
//==================================================
app.use( ( req, res, next ) => {
  res.header( "Access-Control-Allow-Origin", "*" );
  res.header( "Access-Control-Allow-Credentials", true );
  res.header( "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH" );
  res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept, X-Auth-Token' );

  next();
} );
require("./middlware/prod")(app);

//=============================================================================
// Custom route configuration
require("./middlware/routes")(app);
//=============================================================================
// Serving client files during production
app.get( '/*', ( req, res ) => {
  res.sendFile( path.join( __dirname + '/client/build/index.html' ) );
} );

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  handlePreflightRequest: (req, res) => {
    const headers = {
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
        "Access-Control-Allow-Credentials": true
    };
    res.writeHead(200, headers);
    res.end();
  }
});

io.on("connection", socket => {
  socket.on("join", async ({ topicId, username, userId }, callback) => {
    const socketId = socket.id;
    const { error, newUser } = await join(socketId, topicId, username, userId);
    if (error) {
      return callback(error);
    }

    socket.join(newUser.room);
    
    callback(error);
  });

  socket.on("sendMessage", async (data, callback) => {
    const { userId, topicId, message } = data;
    const { error, user } = await getUser(topicId, userId);
    let newMessage = new Chat({
      username: user.username,
      topicId,
      text: message,
      senderId: userId
    });
  
    newMessage = await newMessage.save();

    io.to(topicId).emit("message", newMessage);
    callback(error);
  });

  socket.on("disconnect", () => {
    deleteRoom(socket.id);
  });
});

//=============================================================================
// Starting the server and listening on a port address
server.listen(port, hostname, () => {
  winston.info(`🚀 Server ready at http://${hostname}:${ port }`);
});

// https://github.com/pramodramdas/heroku_multi_dockers for travis ci/cd deployment using nginx and docker