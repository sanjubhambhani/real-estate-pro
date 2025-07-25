"use client"

import { redirect } from "next/navigation"
import { useEffect } from "react"
import store from "store"

export default function AgentLogin() {
  useEffect(() => {
    store.clearAll()
    redirect("/")
  }, [])

  return null
}
