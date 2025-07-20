"use client"

import { Col } from "react-bootstrap"
import _ from "lodash"
import ListingCard from "./card.jsx"

export default function ListingFeed({ listings }) {
  return (
    <>
      {_.map(listings, (listing) => {
        return (
          <Col xs={12} lg={6} key={listing.id}>
            <ListingCard listing={listing} />
          </Col>
        )
      })}
    </>
  )
}
