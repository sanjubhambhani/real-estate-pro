"use client"

import axios from "axios"
import store from "store"
import { Container, Row, Col, Button } from "react-bootstrap"

import LeadForm from "components/leads/form.jsx"
import { useEffect, useState } from "react"

export default function Home() {
  const [agent, setAgent] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("agent")) setAgent(params.get("agent"))
  }, [])

  const submitForm = (values) => {
    if (agent) values.agent = agent
    axios({
      method: "post",
      url: "/api/leads",
      data: values,
    })
      .then((res) => {
        console.log("res", res)
        alert("thanks!")
        // setLoading(false)
        // if (res.status === 200) setMsgSuccess(true)
        // else
        //   setMsgError(
        //     (res && res.data && res.data.message) ||
        //       "Something went wrong, please try again!"
        //   )
      })
      .catch((err) => {
        console.log("err", err)
        // setLoading(false)
        // setMsgError(
        //   (err &&
        //     err.response &&
        //     err.response.data &&
        //     err.response.data.message) ||
        //     "Something went wrong, please try again!"
        // )
      })
  }

  return (
    <Container fluid>
      <Row style={{ padding: 20 }}>
        <Col xs={12} className="mb-3">
          <h3>New Lead Form</h3>
        </Col>
        <Col xs={12}>
          <LeadForm onSubmit={submitForm} />
        </Col>
      </Row>
    </Container>
  )
}
