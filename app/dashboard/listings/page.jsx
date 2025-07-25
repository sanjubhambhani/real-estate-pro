"use client"

import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import store from "store"

import Loader from "components/common/loader"
import ListingFeed from "components/listings/list"

export default function Listings() {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState([])

  useEffect(() => {
    const user = store.get("user:agent")
    if (!user) return
    fetch("/api/listings", {
      headers: { Authorization: user.token },
    })
      .then((res) => res.json())
      .then((data) => {
        setListings(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <Loader />
  return (
    <Container fluid style={{ maxWidth: 1400 }}>
      <Row>
        <Col xs={12}>
          <h5>{listings.length ? listings.length : ""} Listings</h5>
        </Col>
        <ListingFeed listings={listings} />
      </Row>
    </Container>
  )
}
