import React, { Component } from 'react';
// Import the Library
import Rave from 'react-flutterwave-rave'
 
class Ravepay extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.callback = this.callback.bind(this);
    this.close = this.close.bind(this);
  }
 
  callback = (response) => {
    if (response.data.data.status === "successful") {
      this.props.handleSubmit(true);
    }
  }
 
 
  close = () => {
    console.log("Payment closed");
  }
 
  render() {
    const { phone, email, amount } = this.props;
    const pubkey = process.env.REACT_APP_FLWPUBKEY;
    return (
      <div className="App" >
        <Rave
          pay_button_text="Continue"
          className="button"
          payment_method="card"
          customer_email={email}
          customer_phone={phone}
          amount={amount}
          ravePubKey={pubkey}
          callback={this.callback}
          onclose={this.close}
        />
      </div>
    );
  }
}
 
export default Ravepay;
 
   