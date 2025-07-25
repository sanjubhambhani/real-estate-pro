"use client"

import { redirect } from "next/navigation"
import { useState, useEffect } from "react"
import { Container } from "react-bootstrap"
import store from "store"
import axios from "axios"
import moment from "moment"

import NavBar from "components/agents/nav"

export default function DashboardLayout({ children }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = store.get("user:agent")
    if (!user) return redirect("/")
    if (!user.lastLogin) auth()
    if (moment().isAfter(moment(user.lastLogin).add(5, "m"))) auth()
    setLoading(false)
  }, [])

  const auth = async () => {
    const user = store.get("user:agent")
    await axios({
      method: "post",
      url: "/api/auth",
      data: {},
      headers: { Authorization: user.token },
    })
      .then((res) => {
        if (res.status == 200) store.set("user:agent", res.data)
        else {
          store.remove("user:agent")
          redirect("/")
        }
      })
      .catch((err) => {
        store.remove("user:agent")
        redirect("/")
      })
  }

  if (loading) return null
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
