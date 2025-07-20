"use client"

import { Card, Row, Col } from "react-bootstrap"
import { getPropertyValue } from "../../lib/notion"

import { ButtonGroup, Button } from "react-bootstrap"

const PropertyCard = ({ listing }) => {
  const displayPurpose = getPropertyValue(listing, "Purpose")
  const displayPrice = getPropertyValue(listing, "Price").toLocaleString()
  const displayAddress = getPropertyValue(listing, "Address")
  const displayBed = getPropertyValue(listing, "Bedrooms")
  const displayBath = getPropertyValue(listing, "Bathrooms")
  const displaySqFt = getPropertyValue(listing, "Sq. Footage")
  const displayDateListed = getPropertyValue(listing, "Date Listed")
  const displayCover = getPropertyValue(listing, "Cover Image")
  const displayImage = getPropertyValue(listing, "Image")
  const displayMLS = getPropertyValue(listing, "MLS")
  const displayGoogleDrivelink = getPropertyValue(listing, "Google Drive Link")
  const displayPDFlink = getPropertyValue(listing, "PDF Link")

  let displayThumbnail = null
  if (displayCover) {
    let fileID = displayCover
      .replace("https://drive.google.com/file/d/", "")
      .split("/")[0]
    displayThumbnail = `https://drive.google.com/thumbnail?id=${fileID}`
  }

  return (
    <Card style={{ maxWidth: 600, margin: "20px auto", borderRadius: 12 }}>
      <Row>
        <Col md={6} style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 15,
              left: 15,
              background: "#1976d2",
              color: "#fff",
              borderRadius: 8,
              padding: "0.25rem 0.6rem",
              fontWeight: 600,
              fontSize: 14,
              zIndex: 2,
            }}
          >
            {displayPurpose}
          </div>

          <img
            src={displayImage || displayThumbnail}
            alt="Villa Exterior"
            style={{
              borderRadius: "12px 0 0 12px",
              width: "100%",
              height: 150,
              objectFit: "contain",
            }}
          />
        </Col>
        <Col
          md={6}
          style={{
            padding: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ color: "#1976d2", fontWeight: 700, fontSize: 28 }}>
              ${displayPrice}
            </div>
            <div
              style={{ fontWeight: 600, margin: "7px 0 10px 0", fontSize: 19 }}
            >
              {displayAddress}
            </div>
          </div>
          {/* Features grid */}
          <Row>
            <Col
              xs={4}
              style={{ textAlign: "center", borderRight: "1px solid #eee" }}
            >
              <div style={{ fontSize: 22, marginBottom: 4 }}>
                <i className="fa fa-bed"></i>
              </div>
              <div style={{ fontWeight: 700 }}>{displayBed}</div>
              <div style={{ fontSize: 12, color: "#757575" }}>Bed</div>
            </Col>
            <Col
              xs={4}
              style={{ textAlign: "center", borderRight: "1px solid #eee" }}
            >
              <div style={{ fontSize: 22, marginBottom: 4 }}>
                <i className="fa fa-bath"></i>
              </div>
              <div style={{ fontWeight: 700 }}>{displayBath}</div>
              <div style={{ fontSize: 12, color: "#757575" }}>Bath</div>
            </Col>
            <Col xs={4} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>
                <i className="fa fa-expand-arrows-alt"></i>
              </div>
              <div style={{ fontWeight: 700 }}>{displaySqFt}</div>
              <div style={{ fontSize: 12, color: "#757575" }}>Sq. Ft.</div>
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <ButtonGroup style={{ width: "100%" }}>
            <Button variant="outline-secondary">Bookmark</Button>
            <Button variant="outline-secondary">View Details</Button>
            <Button variant="outline-secondary">Share Link</Button>
          </ButtonGroup>
        </Col>
        <Col xs={12}>
          <ButtonGroup style={{ width: "100%" }}>
            <Button
              variant="outline-secondary"
              disabled={!displayGoogleDrivelink}
              onClick={() => window.open(displayGoogleDrivelink)}
            >
              Google Drive
            </Button>
            <Button
              variant="outline-secondary"
              disabled={!displayPDFlink}
              onClick={() => window.open(displayPDFlink)}
            >
              PDF
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Card>
  )
}

export default PropertyCard
