"use client"

import { redirect } from "next/navigation"
import { useState, useEffect } from "react"
import { Container } from "react-bootstrap"
import store from "store"
import axios from "axios"
import moment from "moment"

import NavBar from "components/admins/nav"

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = store.get("user:admin")
    console.log(user)
    if (!user) return redirect("/")
    if (!user.lastLogin) auth()
    if (moment().isAfter(moment(user.lastLogin).add(5, "m"))) auth()
    setLoading(false)
  }, [])

  const auth = async () => {
    const user = store.get("user:admin")
    await axios({
      method: "post",
      url: "/api/auth",
      data: {},
      headers: { Authorization: user.token },
    })
      .then((res) => {
        console.log("auth", res.data)
        if (res.status == 200) store.set("user:admin", res.data)
        else {
          store.remove("user:admin")
          redirect("/")
        }
      })
      .catch((err) => {
        store.remove("user:admin")
        redirect("/")
      })
  }

  if (loading) return null
  return (
    <>
      <NavBar />
      <Container
        fluid
        className="d-flex min-vh-100 bg-light layout-dashboard"
        style={{ paddingTop: "80px" }}
      >
        {children}
      </Container>
    </>
  )
}
