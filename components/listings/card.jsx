"use client"

import { Card, Row, Col } from "react-bootstrap"
import { getPropertyValue } from "lib/notion"

import { ButtonGroup, Button, Badge } from "react-bootstrap"

import { FaBed, FaBath, FaExpandArrowsAlt } from "react-icons/fa"

const PropertyCard = ({ listing }) => {
  const displayAddress = getPropertyValue(listing, "Address")
  const displayType = getPropertyValue(listing, "Type")
  const displayPurpose = getPropertyValue(listing, "Purpose")
  const displayPrice = getPropertyValue(listing, "Price")
  const displayBed = getPropertyValue(listing, "Bedrooms")
  const displayBath = getPropertyValue(listing, "Bathrooms")
  const displaySqFt = getPropertyValue(listing, "Sq. Footage")
  const displayMLS = getPropertyValue(listing, "MLS")
  // const displayDateListed = getPropertyValue(listing, "Date Listed")
  const displayGoogleDrivelink = getPropertyValue(listing, "Google Drive Link")

  const displayPriceFormatted = displayPrice
    ? `$${parseFloat(displayPrice).toLocaleString()}`
    : "-"

  return (
    <Card
      style={{
        maxWidth: 600,
        margin: "10px auto",
        padding: 15,
        borderRadius: 12,
      }}
    >
      <Row style={{ padding: 3 }}>
        <Col
          xs={12}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <Badge bg="primary">{displayPurpose}</Badge>
            &nbsp;
            <Badge bg="secondary">{displayType}</Badge>
          </div>
          <div>
            <Badge bg="dark">MLS #{displayMLS}</Badge>
          </div>
        </Col>

        <Col xs={12} style={{ padding: 10 }}>
          <p style={{ fontWeight: 600, margin: 0 }}>{displayAddress}</p>
        </Col>

        <Col xs={6} style={{ padding: 10 }}>
          <h5 style={{ color: "#1976d2", fontWeight: 600 }}>
            {displayPriceFormatted}
          </h5>
        </Col>

        <Col xs={6} style={{ paddingBottom: 10 }}>
          <Row>
            <Col
              xs={4}
              style={{
                textAlign: "center",
                borderRight: "1px solid #eee",
              }}
            >
              <div style={{ fontSize: 16, marginBottom: 4 }}>
                <FaBed />
              </div>
              <div style={{ fontWeight: 700 }}>{displayBed}</div>
              <div style={{ fontSize: 12, color: "#757575", display: "none" }}>
                Bed
              </div>
            </Col>
            <Col
              xs={4}
              style={{ textAlign: "center", borderRight: "1px solid #eee" }}
            >
              <div style={{ fontSize: 16, marginBottom: 4 }}>
                <FaBath />
              </div>
              <div style={{ fontWeight: 700 }}>{displayBath}</div>
              <div style={{ fontSize: 12, color: "#757575", display: "none" }}>
                Bath
              </div>
            </Col>
            <Col xs={4} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 16, marginBottom: 4 }}>
                <FaExpandArrowsAlt />
              </div>
              <div style={{ fontWeight: 700 }}>{displaySqFt || "-"}</div>
              <div style={{ fontSize: 12, color: "#757575", display: "none" }}>
                Sq. Ft.
              </div>
            </Col>
          </Row>
        </Col>

        <Col xs={12}>
          <ButtonGroup style={{ width: "100%" }}>
            <Button
              variant="outline-primary"
              disabled={!displayGoogleDrivelink}
              onClick={() => window.open(displayGoogleDrivelink)}
            >
              Google Drive
            </Button>
            {/* <Button
              variant="outline-primary"
              disabled={!displayGoogleDrivelink}
              onClick={() => window.open(displayGoogleDrivelink)}
            >
              Share Link
            </Button> */}
          </ButtonGroup>
        </Col>
      </Row>
    </Card>
  )
}

export default PropertyCard
