const nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
require("dotenv").config();

function doc(quote) {
  return `
    <body>
    <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
      <div style="width: 80%; margin: 0 auto">
        <p style="font-size:16px; line-height:20px; background: #20a6fb; padding: 12px; color: #fff;">
          Swissdarl Freight and Logistics Ltd
        </p>
        <table border="1">
          <thead></thead>
          <tbody>
              <tr style="text-align: left;">
                  <th>Company Name</th>
                  <td>${quote.companyName}</td>
              </tr>
              <tr style="text-align: left;">
                  <th>Contact Name</th>
                  <td>${quote.contactFName} ${quote.contactLName}</td>
              </tr>
              <tr style="text-align: left;">
                  <th>Email</th>
                  <td>${quote.email}</td>
              </tr>
              <tr style="text-align: left;">
                  <th>Phone</th>
                  <td>${quote.phone}</td>
              </tr>
              <tr style="text-align: left;">
                  <th>Pickup Address</th>
                  <td>${quote.pickupAddress}</td>
              </tr>
              <tr style="text-align: left;">
                  <th>Pickup City</th>
                  <td>${quote.pickupCity}</td>
              </tr>
              <tr style="text-align: left;">
                  <th>Pickup State</th>
                  <td>${quote.pickupState}</td>
              </tr>
              <tr style="text-align: left;">
                  <th>Destination Address</th>
                  <td>${quote.destinationAddress}</td>
              </tr>
              <tr style="text-align: left;">
                  <th>Destination City</th>
                  <td>${quote.destinationCity}</td>
              </tr>
              <tr style="text-align: left;">
                  <th>Destination State</th>
                  <td>${quote.destinationState}</td>
              </tr>
              <tr style="text-align: left;">
                  <th>Weight</th>
                  <td>${quote.weight}${quote.unit}</td>
              </tr>
              <tr style="text-align: left;">
                  <th>Dimension</th>
                  <td>${quote.dimension}</td>
              </tr>
              <tr style="text-align: left;">
                  <th>Amount</th>
                  <td>NGN${quote.amount}</td>
              </tr>
              <tr style="text-align: left;">
                  <th>Paid</th>
                  <td>${quote.paid}</td>
              </tr>
              <tr style="text-align: left;">
                  <th>Tracking Number</th>
                  <td>${quote.trackingNumber}</td>
              </tr>
          </tbody>
      </table>
      
        <p style="font-size:12px; line-height:20px; background: #333; padding: 12px; color: #fff;">
          &copy; Swissdarl Freight and Logistics Ltd.
        </p>
      </div>
    </div>
  </body>
`;
}

function sendEmail(data, quote) {
  var options = {
    auth: {
      api_user: process.env.EMAIL_USER,
      api_key: process.env.EMAIL_PASS
    }
  }
  
  var client = nodemailer.createTransport(sgTransport(options));
  
  var email = {
    from: `Swissdarl Freight and Logistics Ltd @ ${data.sender}`,
    to: data.reciever,
    subject: 'New Shipping Quote',
    text: 'Hello world',
    html: doc(quote)
  };
  
  client.sendMail(email, function(err, info){
      if (err ){
        console.log(error);
      }
      else {
        console.log('Message sent: ' + info);
      }
  });
}

exports.sendEmail = sendEmail;
