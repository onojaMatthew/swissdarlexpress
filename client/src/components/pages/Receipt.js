import React from "react";
import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import moment from "moment";

const styles = StyleSheet.create({
  document: {
    width: 400
  },
  page: {
    paddingLeft: "30px",
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "center",
    color: "#ff0000",
    fontWeight: "extrabold",
    marginTop: 30,
    marginBottom: "20px"
  },
  date: {
    fontWeight: "bold",
  },
  text: {
    paddingLeft: 20,
    fontSize: 12
  },
  salutation: {
    fontWeight: "extrabold",
    paddingLeft: 20
  },
  paymentMsg: {
    fontWeight: "extrabold",
    paddingTop: 30,
    paddingLeft: 20
  }
});

const Receipt = ({ data }) => {
  return (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.heading}>Swissdarl Freight and Logistics Shipping Invoice.</Text>
          <Text style={styles.text}>Date: {data && moment(data.createAt).format('MMMM Do YYYY, h:mm:ss a')}</Text>
          <Text style={styles.text}>Company name: {data && data.companyName}</Text>
          <Text style={styles.text}>Contact name: {data && data.contactFName} {data && data.contactLName} </Text>
          <Text style={styles.text}>Email Address: {data && data.email}</Text>
          <Text style={styles.text}>Phone: {data && data.phone}</Text>
          <Text style={styles.text}>Pickup address: {data && data.pickupAddress}</Text>
          <Text style={styles.text}>Pickup City: {data && data.pickupCity}</Text>
          <Text style={styles.text}>Pickup State: {data && data.pickupState}</Text>
          <Text style={styles.text}>Destination: {data && data.destinationAddress}</Text>
          <Text style={styles.text}>Destinaion City: {data && data.destinationCity}</Text>
          <Text style={styles.text}>Destination State: {data && data.destinationState}</Text>
          <Text style={styles.text}>Package Information: {data && data.packageInfo}</Text>
          <Text style={styles.text}>No. of package: {data && data.numOfPieces}</Text>
          <Text style={styles.text}>Package weight: {data && data.weight}{data && data.unit}</Text>
          <Text style={styles.text}>Dimension: {data && data.dimension ? data.dimension : "_______________"}</Text>
          <Text style={styles.text}>Shipping Cost: NGN{data && data.amount}</Text>
          <Text style={styles.text}>Payment type: { data.paid === false ? "Pay on delivery" : "Instant payment"}</Text>
          <Text style={styles.text}>Shipping tracking Number: {data && data.trackingNumber}</Text>
          <Text style={styles.text}>Instruction to our dispatch rider: {data && data.specialInstruction}</Text>
          {data && data.paid === true ? null : <Text style={styles.paymentMsg}>You will be charged NGN{data.amount} at the point of delivery</Text>}
        </View>
        <View style={styles.salutation}>
          <Text>Thank your for choosing Swissdarl Freight and Logistics.</Text>
        </View>
      </Page>
    </Document>
  );
}

export default Receipt;