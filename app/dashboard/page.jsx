"use client"

import { Container, Row, Col } from "react-bootstrap"
import store from "store"

export default function Dashboard() {
  const user = store.get("user:agent")

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <h3>Dashboard</h3>
        </Col>

        <Col xs={12}>
          <ul>
            <li>10 new listings added!</li>
            <li>2 new leads!</li>
          </ul>
        </Col>

        <Col xs={12}>
          <a
            target="_blank"
            href={`/lead?agent=${user && user._id.toString()}`}
          >
            <h5>Referral Link</h5>
          </a>
        </Col>
      </Row>
    </Container>
  )
}
