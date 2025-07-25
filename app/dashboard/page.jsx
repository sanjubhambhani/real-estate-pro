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
          <ul>
            <li>10 new listings added!</li>
            <li>2 new leads!</li>
          </ul>
        </Col>

        <Col xs={12}>
          <h5>Referral Link</h5>
          <a
            target="_blank"
            href={`/lead?agent=${user && user._id.toString()}`}
          >
            Link
          </a>
        </Col>
      </Row>
    </Container>
  )
}
