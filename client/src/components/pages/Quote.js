import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Col, 
  Row, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
} from "reactstrap";
import Header from "./Header";
import { Steps, Button, Spin } from "antd";
import CompanyInfo from "./Forms/CompanyInfo";
import PickupInformation from "./Forms/PickupInformation";
import PackageInfo from "./Forms/PackageInfo";
import RequestSummary from "./Forms/RequestSummary";
import { shipmentTotal } from "../../helper/calculator"
import Ravepay from "./Ravepay";
import { requestShipment } from "../../store/actions/action_shipment";
import Footer from "./Footer";

const { Step } = Steps;
const Quote = () => {
  const dispatch = useDispatch();
  const shipment = useSelector((state) => state.shipment);
  const [ amount, setAmount ] = useState(0);
  const [ count, setCount ] = useState(0);
  const [ companyName, setCompanyName ] = useState("");
  const [ contactFName, setContactFName ] = useState("");
  const [ contactLName, setContactLName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ pickupAddress, setPickupAddress ] = useState("");
  const [ destinationAddress, setDestination ] = useState("");
  const [ pickupZip, setPickupZip ] = useState("");
  const [ destinationZip, setDestinationZip ] = useState("");
  const [ pickupState, setPickupState ] = useState("");
  const [ pickupCity, setPickupCity ] = useState("");
  const [ destinationState, setDestinationState ] = useState("");
  const [ destinationCity, setDestinationCity ] = useState("");
  const [ packageInfo, setPackageInfo ] = useState("");
  const [ numOfPieces, setNumOfPieces ] = useState(0);
  const [ weight, setWeight ] = useState(0);
  const [ unit, setUnit ] = useState("");
  const [ dimension, setDimension ] = useState("");
  const [ specialInstruction, setSpecialInstruction ] = useState("");
  const [ cardOption, setCardOption ] = useState(false);
  const [ deliveryOption, setDeliveryOption ] = useState(false);
  const [ errors, setErrors] = useState({});
  const [ errorMsg, setErrorMsg ] = useState("");
  const [ message, setMessage ] = useState("");
  const [modal, setModal] = useState(false);
  const [ modal1, setModal1 ] = useState(false);
  const units = [ "Kg", "Ton" ];
  const toggle = () => setModal(!modal);
  const toggle1 = () => setModal1(!modal1);

  let timeleft = 120;

  useEffect(() => {
    if (shipment.createSuccess === true) {
      setErrorMsg("");
      onClearFields();
      
      setTimeout(() => {
        setCount(0);
      }, 60000);
    } else if (shipment.error && shipment.error.length > 0) {
      setErrorMsg(shipment.error);
      setMessage("");
    }
  }, [ shipment ]);

  const increaseCount = () => {
    setCount(count + 1);
  }
  
  const decreaseCount = () => {
    setCount(count - 1);
    setCardOption(false);
    setDeliveryOption(false);
  }

  useEffect(() => {
    const timer = () => {
      setInterval(() => {
        timeleft -= 1;
      }, 1000);
      return timeleft;
    }
    
    if (shipment.createSuccess === true) {
      setMessage(`Request success!! Your shipping tracking number is: ${shipment.shipments[0].trackingNumber}. You have ${timer()} time left to copy it. Keep it safe`);
    }
  }, [ shipment ]);

  useEffect(() => {
    setAmount(shipmentTotal(numOfPieces, weight, unit));
  }, [numOfPieces, weight]);

  const formValidation = () => {
    let formValid = true;
    let errors = {};

    if (companyName === "") {
      formValid = false;
      errors["companyName"] = "Company name is required";
      setErrorMsg("Company name is required");
    } else if (typeof companyName === "number") {
      formValid = false;
      errors["companyName"] = "Invalid entry. Company name must be alphabets";
      setErrorMsg("Invalid entry. Company name must be alphabets");
    } else if (!contactFName || typeof contactFName === "number") {
      formValid = false;
      errors["contactFName"] = "Contact first name is required";
      setErrorMsg("Contact first name is required");
    } else if (contactLName === "" || typeof contactLName === "number") {
      formValid = false;
      errors["contactLName"] = "Contact last name is required";
      setErrorMsg("Contact last name is required");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      formValid = false;
      errors["email"] = "You have entered an invalid email";
      setErrorMsg("You have entered an invalid email");
    } else if (!phone) {
      formValid = false;
      errors["phone"] = "Phone number is required";
      setErrorMsg("Phone number is required");
    } else if (!pickupAddress) {
      formValid = false;
      errors["pickupAddress"] = "Pick-up address is required";
      setErrorMsg("Pick-up address is required");
    } else if (!destinationAddress) {
      formValid = false;
      errors["destinationAddress"] = "Destination address is required";
      setErrorMsg("Destination address is required");
    } else if (!pickupZip) {
      formValid = false;
      errors["pickupZip"] = "Pick-up zip code is required";
      setErrorMsg("Pick-up zip code is required");
    } else if (!destinationZip) {
      formValid = false;
      errors["destinationZip"] = "Destination zip code is required";
      setErrorMsg("Destination zip code is required");
    } else if (!pickupState) {
      formValid = false;
      errors["pickupState"] = "Pick-up state is required";
      setErrorMsg("Pick-up state is required");
    } else if (!pickupCity) {
      formValid = false;
      errors["pickupCity"] = "Pick-up city is required";
      setErrorMsg("Pick-up city is required");
    } else if (!destinationState) {
      formValid = false;
      errors["destinationState"] = "Destination state is required";
      setErrorMsg("Destination state is required");
    } else if (!destinationCity) {
      formValid = false;
      errors["destinationCity"] = "Destination city is required";
      setErrorMsg("Destination city is required");
    } else if (!packageInfo) {
      formValid = false;
      errors["packageInfo"] = "Package description is required";
      setErrorMsg("Package description is required");
    } else if (!numOfPieces) {
      formValid = false;
      errors["numOfPieces"] = "Number of pieces is required";
      setErrorMsg("Number of pieces is required");
    } else if (!weight) {
      formValid = false;
      errors["weight"] = "The weight of the shipment in kg or tons is required";
      setErrorMsg("The weight of the shipment in kg or tons is required");
    } else if (!dimension) {
      formValid = false;
      errors["dimension"] = "The shipment dimension is required";
      setErrorMsg("The shipment dimension is required");
    } else if (!specialInstruction) {
      formValid = false;
      errors["specialInstruction"] = "Leave a special instruction for the shipment";
      setErrorMsg("Leave a special instruction for the shipment")
    } else if (!unit) {
      formValid = false;
      errors["unit"] = "The unit of the weight is required";
      setErrorMsg("The unit of the weight is required");
    }

    setErrors(errors);
    return formValid;
  }
  
  const handleSubmit = (paid="") => {
    if (formValidation()) {
      const data = {
        companyName,
        contactFName,
        contactLName,
        phone,
        email,
        pickupAddress,
        pickupState,
        pickupCity,
        pickupZip,
        destinationState,
        destinationZip,
        weight,
        dimension,
        packageInfo,
        specialInstruction,
        amount,
        numOfPieces,
        paid: paid ? paid : false
      }

      dispatch(requestShipment(data));
    }
    
  }

  const onClearFields = () => {
    setCompanyName("");
    setContactFName("");
    setContactLName("");
    setEmail("");
    setPhone("");
    setPackageInfo("");
    setPickupAddress("");
    setPickupCity("");
    setPickupState("");
    setPickupZip("");
    setDestination("");
    setDestinationState("");
    setDestinationCity("");
    setDestinationZip("");
    setSpecialInstruction("");
    setNumOfPieces("");
    setWeight("");
    setDimension();
  }

  return (
    <div className="quote">
      <Header />
      <section className="wave-container">
        <Row className="justify-content-center">
          <Col xs="8" xl="6" className="home-text">
            <h1>Request a Shipping Quote Here</h1>
          </Col>
        </Row>
        <svg id="curve" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#0099ff" fillOpacity="1" d="M0,192L80,176C160,160,320,128,480,149.3C640,171,800,245,960,256C1120,267,1280,213,1360,186.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </section>
      {/* {} */}
      <Row className="justify-content-center">
        <Col xs="10" xl="9" className="steps">
          <Steps current={count} size="small">
            <Step title={count === 0 ? "In Progess" : "Finished"} description="Company Information" />
            <Step title={count < 1 ? "Waiting" : count === 1 ? "In Progress" : "Finished"}  description="Pick-up and Delivery Information." />
            <Step title={count < 2 ? "Waiting" : count === 2 ? "In Progress" : "Finished"} description="Package Information" />
            <Step title={count < 3 ? "Waiting" : count === 3 ? "In Progress" : "Finished"} description="Quote Summary" />
            <Step title={count < 4 ? "Waiting" : count === 4 ? "In Progress" : "Finished"} description="Payment Options" />
          </Steps>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs="9" xl="8">
          {count === 0 ? 
            <CompanyInfo
              companyName={companyName} 
              setCompanyName={setCompanyName}
              contactFName={contactFName}
              setContactFName={setContactFName}
              contactLName={contactLName}
              setContactLName={setContactLName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              errors={errors}
            /> : 
            count === 1 ? 
            <PickupInformation 
              pickupAddress={pickupAddress}
              pickupCity={pickupCity}
              pickupState={pickupState}
              pickupZip={pickupZip}
              destinationAddress={destinationAddress}
              destinationCity={destinationCity}
              destinationState={destinationState}
              destinationZip={destinationZip}
              setPickupAddress={setPickupAddress}
              setPickupCity={setPickupCity}
              setPickupState={setPickupState}
              setPickupZip={setPickupZip}
              setDestination={setDestination}
              setDestinationCity={setDestinationCity}
              setDestinationState={setDestinationState}
              setDestinationZip={setDestinationZip}
              errors={errors}
            /> : 
            count === 2 ? 
            <PackageInfo
              packageInfo={packageInfo}
              weight={weight}
              // selectAfter={selectAfter}
              dimension={dimension}
              specialInstruction={specialInstruction}
              numOfPieces={numOfPieces}
              setPackageInfo={setPackageInfo}
              setWeight={setWeight}
              setUnit={setUnit}
              units={units}
              unit={unit}
              setNumOfPieces={setNumOfPieces}
              setDimension={setDimension}
              setSpecialInstruction={setSpecialInstruction}
              errors={errors}
            /> : 
            count === 3 ?
            <RequestSummary
              companyName={companyName}
              contactFName={contactFName}
              contactLName={contactLName}
              email={email}
              phone={phone}
              pickupAddress={pickupAddress}
              pickupCity={pickupCity}
              pickupState={pickupState}
              pickupZip={pickupZip}
              destinationAddress={destinationAddress}
              destinationCity={destinationCity}
              destinationState={destinationState}
              destinationZip={destinationZip}
              packageInfo={packageInfo}
              weight={weight}
              dimension={dimension}
              specialInstruction={specialInstruction}
              numOfPieces={numOfPieces}
            /> : cardOption === true ? (
            <Row className="justify-content-center">
              <Col xs="3" xl="3">
                
              </Col>
            </Row>
          ) : deliveryOption === true ? (
            <>
              {errorMsg.length > 0  ? <p style={{ color: "#ff0000", textAlign: "center" }}>{errorMsg}</p> : null}
              {message.length > 0  ? <p style={{ color: "#00ff00", textAlign: "center" }}>{message}</p> : null}
              <Row className="justify-content-center">
                <Col xs="3" xl="3">
                <Button 
                  type="primary"
                  onClick={() => handleSubmit()}
                >Submit</Button>
                </Col>
              </Row>
            </>
          ) : (
            <Row className="justify-content-center">
              <Col xs="10" xl="5">
                <h3>Select a Payment Option</h3>
                <p>Your total shipping cost is: <span style={{ 
                    color: "#ff0000",
                    fontSize: "14px"
                  }}>&#8358;{amount}</span></p>
                <Row>
                  <Col xs="6" xl="6">
                    <Button color="danger" onClick={toggle1}>Pay with card</Button>
                    <Modal isOpen={modal1} toggle1={toggle1}>
                      <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                      <ModalBody>
                        {errorMsg.length ? <p style={{
                          marginTop: 20,
                          color: "#ff0000"
                        }}>{errorMsg}</p> : shipment.createSuccess === true ? 
                        <p style={{
                          marginTop: 20
                        }}>{message}</p> :
                        <p style={{
                          marginTop: 20
                        }}>Your credit card will be charged <span style={{
                          fontWeight: "bold",
                          color: "#ff0000"
                        }}>NGN{amount}</span> for shipping cost. To continue click CONTINUE else click CANCEL</p> }
                        
                      </ModalBody>
                      <ModalFooter>
                        {shipment.createLoading === true ? 
                          <Spin tip="Processing..." /> : (
                            <Ravepay 
                              amount={amount} 
                              disabled={errorMsg.length > 0}
                              email={email} 
                              name={companyName}
                              handleSubmit={handleSubmit}
                              phone={phone}
                            /> 
                          )}
                        <Button color="secondary" onClick={toggle1}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                  </Col>
                  <Col xs="6" xl="6">
                    <Button color="danger" onClick={toggle}>Pay on Delivery</Button>
                    <Modal isOpen={modal} toggle={toggle}>
                      <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                      <ModalBody>
                      {errorMsg.length ? <p style={{
                          marginTop: 20,
                          color: "#ff0000"
                        }}>{errorMsg}</p> : shipment.createSuccess === true ?  <p style={{
                          marginTop: 20
                        }}>{message}</p> : <p style={{
                          marginTop: 20
                        }}>You will be charged <span style={{ 
                          color: "#ff0000",
                          fontWeight: "bold"
                        }}>NGN{amount}</span> at the point of delivery as shipping cost. Click CONTINUE to proceed or CANCEL to abort request.</p>}
                        
                      </ModalBody>
                      <ModalFooter>
                        {shipment.createLoading === true ? 
                          <Spin tip="Processing..." /> : (
                          <Button 
                            color="primary" 
                            disabled={errorMsg.length > 0}
                            onClick={() => handleSubmit(false)}>
                              Continue
                          </Button>
                          )
                        }
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <Row className="justify-content-center mb-5 mt-5">
        <Col xs="9" xl="6">
          <Row>
            <Col xs="6" xl="6">
              <Button 
                type="primary"
                disabled={count === 0}
                onClick={() => decreaseCount()}
              >Previous</Button>
            </Col>
            <Col xs="6" xl="6">
              <Button 
                type="primary"
                disabled={count === 4}
                onClick={() => increaseCount()}
                style={{
                  float: "right"
                }}
              >Next</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

export default Quote;