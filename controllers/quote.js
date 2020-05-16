const { Quote } = require("../models/quote");
const { sendEmail } = require("../services/mailer");

exports.create = (req, res, next) => {
  const {
    pickupAddress,
    pickupCity,
    pickupState,
    email,
    phone,
    destinationAddress,
    destinationCity,
    destinationState,
    packageInfo,
    weight,
    dimension,
    specialInstruction,
    numOfPieces,
    companyName,
    contactLName,
    contactFName,
    amount,
    paid,
    unit
  } = req.body;

  // call the create api from the front-end then after saving to database, call the method
  // that sends realtime message to the client and pass to it the returned values from the 
  // database. Emit the message from the server while the client listen to the emit call
  // from the server.
  let shipmentTrackingNumber;
  const randomNum = Math.floor(10000000 + Math.random() * 90000000);
  if (pickupState === "Lagos") {
    shipmentTrackingNumber = "1" + randomNum + pickupState.slice(0,3).toUpperCase();
  } else if (pickupState === "Port Harcourt") {
    shipmentTrackingNumber = "2" + randomNum + pickupState.slice(0,3).toUpperCase();
  } else if (pickupState === "Abuja Federal Capital Territory") {
    shipmentTrackingNumber = "3" + randomNum + pickupState.slice(0,3).toUpperCase();
  } else if (pickupState === "Enugu") {
    shipmentTrackingNumber = "4" + randomNum + pickupState.slice(0,3).toUpperCase();
  } else if (pickupState === "Delta") {
    shipmentTrackingNumber = "5" + randomNum + pickupState.slice(0,3).toUpperCase();
  } else if (pickupState === "Kano") {
    shipmentTrackingNumber = "6" + randomNum + pickupState.slice(0,3).toUpperCase();
  } else if (pickupState === "Plateau") {
    shipmentTrackingNumber = "7" + randomNum + pickupState.slice(0,3).toUpperCase();
  } else {
    return res.status(400).json({ error: `We don't have a branch in ${pickupState} state`});
  }
  
  let newQuote = new Quote({
    pickupAddress,
    pickupCity,
    pickupState,
    email,
    phone,
    amount,
    destinationAddress,
    destinationCity,
    destinationState,
    packageInfo,
    weight,
    dimension,
    specialInstruction,
    numOfPieces,
    companyName,
    contactLName,
    contactFName,
    paid,
    unit,
    trackingNumber: shipmentTrackingNumber
  });


  newQuote.save()
    .then(quote => {
      if (!quote) return res.status(400).json({ error: "Failed to process request" });
      const sender = "no-reply@swissdarl.com";
      const reciever = "ecommerce@swissdarl.com";
      const subject = "New Shipping Quote";
      const data = {
        sender,
        subject,
        reciever
      }
      
      sendEmail(data, quote);
      return res.json(quote);
      
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: err.message });
    });
}

exports.getQuote = (req, res) => {
  const { quoteId } = req.params;
  if (!quoteId) return res.status(400).json({ error: "Invalid parameter values" });
  Quote.findById({ _id: quoteId})
    .then(quote => {
      if (!quote) return res.status(400).json({ error: "No shipment found" });
      res.json(quote);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.searchShipments = ( req, res, next ) => {
  const q = req.query.q;
  if ( !q ) return res.status( 400 ).json( { error: "Search text is required" } );
  Quote.find( { trackingNumber: { $regex: new RegExp( q ) } } )
    .then( quote => {
      res.json( { quote } );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

exports.hasView = (req, res) => {
  const { shippingId } = req.params;

  if (!shippingId) return res.status(400).json({ error: "Invalid parameter values" });
  Quote.findByIdAndUpdate({ _id: shippingId }, { $set: { isView: true }}, { new: true })
    .then(result => {
      if (!result) return res.status(400).json({ error: "No shipment found" });
      res.json(result);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.getAllQuotes = (req, res) => {
  Quote.find({})
    .sort({ createdAt: -1 })
    .then(quotes => {
      if (!quotes) return res.status(400).json({ error: "No records found" });
      res.json(quotes);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.deleteQuote = (req, res) => {
  const { quoteId } = req.params;
  if (!quoteId) return res.status(400).json({ error: "Invalid parameter values" });
  Quote.findByIdAndDelete({ _id: quoteId})
    .then(quote => {
      if (!quote) return res.status(400).json({ error: "Request failed. Shipment not found" });
      res.json({ message: "Deleted successfully" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.updateQuote = (req, res) => {
  const { quoteId } = req.params;
  if (!quoteId) return res.status(400).json({ error: "Invalid parameter values"});
  Quote.findByIdAndUpdate({ _id: quoteId}, { $set: { delivered: true }}, { new: true })
    .then(quote => {
      if (!quote) return res.status(400).json({ error: "Request failed. Try again" });
      res.json({ quote, message: "Request completed" });
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
}

exports.approve = (req, res) => {
  const { shipmentId, userId } = req.params;
  const { _id, role } = req.user;
  if (!_id || !role) return res.status(400).json({ error: "Unauthorized access. Please log in to continue" });
  if (role !== "admin") return res.status(400).json({ error: "Only admin is authorized for this operation" });
  if (!shipmentId || !userId) return res.status(400).json({ error: "Invalid parameter values" });
  if (userId !== _id) return res.status(400).json({ error: "Unknown user" });
  Quote.findByIdAndUpdate({ _id: shipmentId}, { $set: { approve: true }}, { new: true })
    .then(result => {
      if (!result) return res.status(400).json({ error: "Operation failed. Entity not found" });
      return res.json(result);
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

exports.changeStatus = (req, res) => {
  const { shipmentId, userId, status } = req.params;
  const { _id, role } = req.user;
  if (!_id || !role) return res.status(400).json({ error: "Unauthorized access. Please log in to continue" });
  if (role !== "admin") return res.status(400).json({ error: "Only admin is authorized for this operation" });
  if (!shipmentId || !userId, !status) return res.status(400).json({ error: "Invalid parameter values" });
  if (userId !== _id) return res.status(400).json({ error: "Unknown user" });
  Quote.findByIdAndUpdate({ _id: shipmentId}, { $set: { status }}, { new: true })
    .then(result => {
      if (!result) return res.status(400).json({ error: "Operation failed. Entity not found" });
      return res.json(result);
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

