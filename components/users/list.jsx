"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Table, Button } from "react-bootstrap"
import _ from "lodash"
import axios from "axios"
import store from "store"

import UserRow from "./row"
import UserModal from "./modal"
import Notify from "components/common/notify"

export default function UserList({}) {
  const [loading, setLoading] = useState(false)
  const [collection, setCollection] = useState("agents")
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const admin = store.get("user:admin")
  const [notify, setNotify] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    axios({
      method: "GET",
      url: `/api/${collection}`,
      headers: { Authorization: admin.token },
    })
      .then((res) => {
        setUsers(res.data)
      })
      .catch((err) => {})
  }

  const createUser = async (values) => {
    axios({
      method: "POST",
      url: `/api/${collection}`,
      headers: { Authorization: admin.token },
      data: values,
    })
      .then((res) => {
        setLoading(false)
        setShowModal(false)
        setNotify({
          show: true,
          hide: () => setNotify(null),
          message: "User created successfully!.",
        })
        setUsers([res.data, ...users])
      })
      .catch((err) => {
        setLoading(false)
        setNotify({
          show: true,
          hide: () => setNotify(null),
          message: "Something went wrong, please try again!",
        })
      })
  }

  const updateUser = async (values) => {
    axios({
      method: "PATCH",
      url: `/api/${collection}/${values._id}`,
      headers: { Authorization: admin.token },
      data: values,
    })
      .then((res) => {
        setLoading(false)
        setShowModal(false)
        setNotify({
          show: true,
          hide: () => setNotify(null),
          message: "User updated successfully!.",
        })
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === res.data._id ? res.data : user))
        )
      })
      .catch((err) => {
        setLoading(false)
        setNotify({
          show: true,
          hide: () => setNotify(null),
          message: "Something went wrong, please try again!",
        })
      })
  }

  const handleSubmit = async (values) => {
    setLoading(true)
    if (values._id) await updateUser(values)
    else await createUser(values)
  }

  const items = _.map(users, (user) => {
    return (
      <UserRow
        key={user._id}
        user={user}
        setUser={setUser}
        setShowModal={setShowModal}
      />
    )
  })

  return (
    <Container fluid>
      {showModal && (
        <UserModal
          show={showModal}
          hide={setShowModal}
          defaultValues={user}
          onSubmit={handleSubmit}
          loading={loading}
        />
      )}
      {notify && <Notify payload={notify} />}
      <Row>
        <Col xs={6}>
          <h5>Manage Agents</h5>
        </Col>
        <Col xs={6} style={{ textAlign: "right", marginBottom: 10 }}>
          <Button
            size="md"
            onClick={() => {
              setUser({ active: true })
              setShowModal(true)
            }}
          >
            Create
          </Button>
        </Col>
        <Col xs={12}>
          <Table responsive striped>
            <thead>
              <tr>
                <th>Active</th>
                <th>Name</th>
                <th>Email</th>
                <th>Last Login</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>{items}</tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}
