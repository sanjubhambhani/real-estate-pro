"use client"

import axios from "axios"
import { Container, Row, Col, Modal, Button } from "react-bootstrap"

import LeadForm from "components/leads/form.jsx"
import LeadModal from "components/leads/modal"
import { useEffect, useState } from "react"

export default function Home() {
  const [agent, setAgent] = useState(null)
  const [showModal, setShowModal] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("agent")) setAgent(params.get("agent"))
  }, [])

  const submitForm = (values) => {
    setLoading(true)
    if (agent) values.agent = agent
    axios({
      method: "post",
      url: "/api/leads",
      data: values,
    })
      .then((res) => {
        if (res.status == 200) setShowModal("success")
        else setShowModal("error")
        setLoading(false)
      })
      .catch((err) => {
        setShowModal("error")
        setLoading(false)
      })
  }

  return (
    <Container fluid>
      <LeadModal showModal={showModal} setShowModal={setShowModal} />
      <Row style={{ padding: 15 }}>
        <Col xs={12} className="mb-3 text-center">
          <h3>Please fill in the details</h3>
        </Col>
        <Col xs={12}>
          <LeadForm onSubmit={submitForm} loading={loading} />
        </Col>
      </Row>
    </Container>
  )
}
