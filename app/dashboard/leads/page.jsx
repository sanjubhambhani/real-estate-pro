"use client"

import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import store from "store"

import Loader from "components/common/loader"
import LeadsList from "components/leads/list"

export default function Leads() {
  const [loading, setLoading] = useState(true)
  const [leads, setLeads] = useState([])

  useEffect(() => {
    const user = store.get("user:agent")
    if (!user) return
    fetch(`/api/leads?agent=${user._id}`, {
      headers: { Authorization: user.token },
    })
      .then((res) => res.json())
      .then((data) => {
        setLeads(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <Loader />
  return (
    <Container fluid style={{ maxWidth: 1400 }}>
      <Row>
        <Col xs={12}>
          <h5>
            {leads.length ? leads.length : ""}{" "}
            {leads.length == 1 ? "Lead" : "Leads"}
          </h5>
        </Col>
        <LeadsList leads={leads} />
      </Row>
    </Container>
  )
}
