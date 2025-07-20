"use client"

import Link from "next/link"
import { useState } from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import axios from "axios"

import LoginForm from "../../components/login/form.jsx"
import LoginSuccess from "../../components/login/success.jsx"

// TODO: handle errors
export default function AgentLogin() {
  const [isSubmitted, setSubmitted] = useState(false)

  const submitEmail = (values) => {
    axios({
      method: "post",
      url: "/api/auth/agent/login",
      data: values,
    })
      .then((res) => {
        if (res.status === 200) setSubmitted(true)
      })
      .catch((err) => console.log(err))
  }

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100 bg-dark"
    >
      <Row className="justify-content-center w-100">
        <Col style={{ maxWidth: 500 }}>
          <Card className="shadow-sm">
            <Card.Body className="p-4 p-md-5 text-center">
              <div className="mb-3">
                <h4>Agent Login</h4>
              </div>
              {isSubmitted ? (
                <LoginSuccess />
              ) : (
                <LoginForm onSubmit={submitEmail} />
              )}
              <div className="text-muted small">
                <p className="m-0">
                  Need Help? <Link href="#">help@rohito.com</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
