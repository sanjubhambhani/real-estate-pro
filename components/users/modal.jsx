"use client"

import { Form, Button, FloatingLabel, Spinner, Modal } from "react-bootstrap"
import { useForm } from "react-hook-form"

export default function UserModal({
  show,
  hide,
  defaultValues,
  onSubmit,
  loading,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues,
  })

  const isUpdate = defaultValues && defaultValues._id ? true : false

  return (
    <Modal show={show} onHide={hide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isUpdate ? "Update User" : "Create User"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Check
              {...register("active", { required: false })}
              type="switch"
              label="Active"
            />
          </Form.Group>

          <Form.Group>
            <FloatingLabel label="Full Name" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Full Name"
                {...register("name", { required: true })}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <FloatingLabel label="Email Address" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email Address"
                {...register("email", { required: true })}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <FloatingLabel label="Phone Number" className="mb-3">
              <Form.Control
                type="phone"
                placeholder="Phone Number"
                {...register("phone", { required: false })}
              />
            </FloatingLabel>
          </Form.Group>
          <Button
            variant="outline-primary"
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
