"use client"

import { redirect } from "next/navigation"
import { useEffect } from "react"
import { Container } from "react-bootstrap"
import store from "store"

import NavBar from "components/agents/nav"

export default function DashboardLayout({ children }) {
  useEffect(() => {
    const token = store.get("token")
    if (!token) redirect("/")
  }, [])

  return (
    <>
      <NavBar />
      <Container
        fluid
        className="d-flex min-vh-100 bg-light"
        style={{ paddingTop: "70px" }}
      >
        {children}
      </Container>
    </>
  )
}
