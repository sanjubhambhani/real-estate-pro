"use client"

import { Container, Row, Col, Table } from "react-bootstrap"
import _ from "lodash"

import LeadRow from "./row"

export default function LeadsList({ leads }) {
  let rows = []

  if (leads.length)
    _.map(leads, (lead) => rows.push(<LeadRow key={lead.id} lead={lead} />))
  else
    rows.push(
      <tr key="empty">
        <td colSpan={4}>No results found.</td>
      </tr>
    )

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <Table responsive bordered striped className="leads-list">
            <thead>
              <tr style={{ background: "black", color: "white" }}>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Created</td>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}
