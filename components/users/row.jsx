"use client"

import moment from "moment"
import { FaDotCircle } from "react-icons/fa"

export default function UserRow({ user, setUser, setShowModal }) {
  return (
    <tr
      onClick={() => {
        setUser(user)
        setShowModal(true)
      }}
    >
      <td>
        <FaDotCircle style={{ color: user.active ? "green" : "red" }} />
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.lastLogin ? moment(user.lastLogin).format("lll") : "-"}</td>
      <td>{moment(user.created).format("lll")}</td>
    </tr>
  )
}
