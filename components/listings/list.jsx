"use client"

import { Container, Row, Col } from "react-bootstrap"
import _ from "lodash"
import ListingCard from "./card.jsx"

export default function ListingList({ listings }) {
  if (!listings.length) return null

  return (
    <Container fluid>
      <Row>
        {_.map(listings, (listing) => {
          return (
            <Col xs={12} sm={12} md={6} lg={4} xl={3} key={listing.id}>
              <ListingCard listing={listing} key={listing.id} />
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}
