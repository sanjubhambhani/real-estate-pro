"use client"

import { useEffect, useState } from "react"
import { Container, Row } from "react-bootstrap"

import ListingFeed from "../../../../components/listings/feed.jsx"

export default function Listings() {
  const [listings, setListings] = useState([])

  useEffect(() => {
    fetch("/api/listings")
      .then((res) => res.json())
      .then((data) => {
        setListings(data)
      })
  }, [])

  return (
    <Container>
      <Row>
        <ListingFeed listings={listings} />
      </Row>
    </Container>
  )
}
