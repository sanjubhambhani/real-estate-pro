"use client"

import { Row, Col } from "react-bootstrap"

import UsersList from "components/users/list"

export default function Listings() {
  return (
    <Row>
      <Col xs={12}>
        <UsersList />
      </Col>
    </Row>
  )
}
