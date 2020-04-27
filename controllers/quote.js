const { Quote } = require("../models/quote");
const mailer = require("../services/mailer");
const Mailgun = require("mailgun").Mailgun;
const msg = new Mailgun("fa1334232ec6dfa6d3b303c4d273adba-ed4dc7c4-26421b6e");

exports.create = (req, res, next) => {
  const {
    pickupAddress,
    pickupCity,
    pickupState,
    pickupZip,
    email,
    phone,
    destinationAddress,
    destinationCity,
    destinationState,
    destinationZip,
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
    pickupZip,
    email,
    phone,
    amount,
    destinationAddress,
    destinationCity,
    destinationState,
    destinationZip,
    packageInfo,
    weight,
    dimension,
    specialInstruction,
    numOfPieces,
    companyName,
    contactLName,
    contactFName,
    paid,
    trackingNumber: shipmentTrackingNumber
  });


  return newQuote.save()
    .then(quote => {
      if (!quote) return res.status(400).json({ error: "Failed to process request" });
      res.json(quote);
      const subject = "New Quote Request";
      const name = "Swissdarl Express";
      const message = 
      `
        <p><strong>Company Name:</strong> ${quote.companyName}</p>
        <p><strong>Contact First Name:</strong> ${quote.contactFName}</p>
        <p><strong>Contact Last Name:</strong> ${quote.contactLName}</p>
        <p><strong>Pick-up Address:</strong> ${quote.pickupAddress}</p>
        <p><strong>Pick-up City:</strong> ${quote.pickupCity}</p>
        <p><strong>Pick-up State:</strong> ${quote.pickupState}</p>
        <p><strong>Pick-up zip:</strong> ${quote.pickupZip}</p>
        <p><strong>Destination Address:</strong> ${quote.destinationAddress}</p>
        <p><strong>Destination State:</strong> ${quote.destinationState}</p>
        <p><strong>Destination City:</strong> ${quote.destinationCity}</p>
        <p><strong>Destination Zip:</strong> ${quote.destinationZip}</p>
        <p><strong>Weight:</strong> ${quote.weight}</p>
        <p><strong>Dimension:</strong> ${quote.dimension}</p>
        <p><strong>Amount:</strong> ${quote.amount}</p>
        <p><strong>Amount:</strong> ${quote.amount}</p>
        <p><strong>Tracking Number:</strong> ${quote.trackingNumber}</p>
      `
      mailer(name, "ecommerce@swissdarl.com", subject, message);
    })
    .catch(err => {
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