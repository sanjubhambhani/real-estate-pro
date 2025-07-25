"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Alert } from "react-bootstrap"
import axios from "axios"
import store from "store"

import LoginForm from "components/login/form.jsx"
import LoginSuccess from "components/login/success.jsx"

export default function AgentLogin() {
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState(null)
  const [collection, setCollection] = useState("agents")

  const [msgSuccess, setMsgSuccess] = useState(null)
  const [msgError, setMsgError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("email")) setEmail(params.get("email"))
    if (params.get("admin")) setCollection("admins")

    const agent = store.get("user:agent")
    if (agent) return router.push("/dashboard")
    const admin = store.get("user:admin")
    if (admin) return router.push("/admin")

    const otp = params.get("otp")
    if (otp) submitToken({ otp })
    else setLoading(false)
  }, [])

  const submitToken = (values) => {
    axios({
      method: "post",
      url: "/api/auth/verify",
      data: values,
    })
      .then((res) => {
        if (res.status === 200) {
          const { user, collection } = res.data
          if (collection == "admins") {
            store.set("user:admin", user)
            router.push("/admin")
          } else {
            store.set("user:agent", user)
            router.push("/dashboard")
          }
        } else {
          setLoading(false)
          setMsgError(
            (res && res.data && res.data.message) ||
              "Something went wrong, please try again!"
          )
        }
      })
      .catch((err) => {
        setLoading(false)
        setMsgError(
          (err &&
            err.response &&
            err.response.data &&
            err.response.data.message) ||
            "Something went wrong, please try again!"
        )
      })
  }

  const submitEmail = (values) => {
    setLoading(true)
    values.collection = collection
    axios({
      method: "post",
      url: "/api/auth/login",
      data: values,
    })
      .then((res) => {
        setLoading(false)
        if (res.status === 200) setMsgSuccess(true)
        else
          setMsgError(
            (res && res.data && res.data.message) ||
              "Something went wrong, please try again!"
          )
      })
      .catch((err) => {
        setLoading(false)

        setMsgError(
          (err &&
            err.response &&
            err.response.data &&
            err.response.data.message) ||
            "Something went wrong, please try again!"
        )
      })
  }

  let display = null

  if (loading) display = <p>loading....</p>
  else if (msgSuccess) display = <LoginSuccess />
  else display = <LoginForm onSubmit={submitEmail} defaultValues={{ email }} />

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100 bg-dark"
    >
      <Row className="justify-content-center w-100">
        <Col style={{ maxWidth: 500 }}>
          {msgError && <Alert variant="danger">{msgError}</Alert>}
          <Card className="shadow-sm">
            <Card.Body className="p-4 p-md-5 text-center">
              <div className="mb-3">
                <h4>{collection == "admins" ? "Admin" : "Agent"} Login</h4>
              </div>
              {display}
              <div className="text-muted small">
                <p className="m-0">
                  Need Help? <Link href="#">help@sanjub.com</Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
