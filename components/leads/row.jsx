"use client"

import { getPropertyValue } from "lib/notion"
import moment from "moment"

const LeadRow = ({ lead }) => {
  const displayName = getPropertyValue(lead, "Name")
  const displayEmail = getPropertyValue(lead, "Email Address")
  const displayPhone = getPropertyValue(lead, "Phone Number")
  const displayCreated = getPropertyValue(lead, "Created Time")

  return (
    <tr>
      <td>{displayName}</td>
      <td>{displayEmail}</td>
      <td>{displayPhone}</td>
      <td>{displayCreated && moment(displayCreated).format("LL")}</td>
    </tr>
  )
}

export default LeadRow
