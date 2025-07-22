"use client"

import { Container, Row, Col } from "react-bootstrap"
import _ from "lodash"
import ListingCard from "./card.jsx"

export default function ListingFeed({ listings }) {
  return (
    <Container fluid>
      <Row>
        {_.map(listings, (listing) => {
          return (
            <Col xs={12} lg={6} xl={4} key={listing.id}>
              <ListingCard listing={listing} />
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}
