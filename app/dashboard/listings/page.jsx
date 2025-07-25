"use client"

import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import store from "store"

import ListingFeed from "components/listings/list.jsx"

export default function Listings() {
  const [isLoading, setIsLoading] = useState(true)
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
        setIsLoading(false)
      })
  }, [])

  // TODO: migrate to loading component with spinner.
  if (isLoading)
    return (
      <Container fluid>
        <Row>
          <Col xs={12} className="text-center">
            <h5>loading....</h5>
          </Col>
        </Row>
      </Container>
    )

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h5>Listings ({listings.length})</h5>
        </Col>
        <ListingFeed listings={listings} />
      </Row>
    </Container>
  )
}
