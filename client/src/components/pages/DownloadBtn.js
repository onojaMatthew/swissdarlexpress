import React, { useState, useEffect } from "react";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import { Row, Col, Card, CardBody } from "reactstrap";
import Receipt from "./Receipt";

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    alignContent: "center"
  },
  viewer: {
    height: 400,
    width: "100%",
    marginBottom: 20
  },
  h5: {
    color: "green"
  }
});

const DownloadButton = ({ data }) => {
  const [ show, setShow ] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []); 

  return (
    <Row className="justify-content-center">
      <Col xs="12" xl="8">
        <Card>
          <CardBody>
            <h5 style={styles.h5}>Your shipping request has been received</h5>
            <p>Use the download button at the top of the file when your mouse come across it to download your invoice. Ensure to keep it safe for reference purposes</p>
            <PDFViewer style={styles.viewer}>
              <Receipt data={data} />
            </PDFViewer>
          </CardBody>
        </Card>
        
        {/* <div className="mt-4 mb-3 download" style={styles.buttonContainer}>
          {show && <PDFDownloadLink
            document={<Receipt data={data} />}
            fileName="invoice.pdf"
            style={{
              textDecoration: "none",
              padding: "10px",
              color: "#fff",
              backgroundColor: "#1890ff",
              border: "1px solid #4a4a4a"
            }}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Downloading document..." : "Download Pdf"
            }
          </PDFDownloadLink>
          }
        </div> */}
      </Col>
    </Row>
  );
}

export default DownloadButton;