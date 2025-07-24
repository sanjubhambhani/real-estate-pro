"use client"

// import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"

export default function Dashboard() {
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <h3>Dashboard</h3>
          <ul>
            <li>10 new listings added!</li>
            <li>2 new leads!</li>
          </ul>
        </Col>
      </Row>
    </Container>
  )
}
