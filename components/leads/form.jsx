"use client"

import { Form, Button, InputGroup } from "react-bootstrap"
import { useForm } from "react-hook-form"

export default function LeadForm({ onSubmit, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
  })

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="name">
        <InputGroup>
          <Form.Control
            type="name"
            placeholder="Full Name"
            {...register("name", { required: false })}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <InputGroup>
          <Form.Control
            type="email"
            placeholder="Email Address"
            {...register("email", { required: false })}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="phone">
        <InputGroup>
          <Form.Control
            type="phone"
            placeholder="Phone Number"
            {...register("phone", { required: false })}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="occupants">
        <InputGroup>
          <Form.Control
            type="occupants"
            placeholder="Number of Occupants"
            {...register("occupants", { required: false })}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="Phone">
        <InputGroup>
          <Form.Control
            type="term"
            placeholder="Short Term or Long Term"
            {...register("term", { required: false })}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="Phone">
        <InputGroup>
          <Form.Control
            type="salary_range"
            placeholder="Household Salary Range"
            {...register("salary_range", { required: false })}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="Phone">
        <InputGroup>
          <Form.Control
            type="credit_score"
            placeholder="Credit Score"
            {...register("credit_score", { required: false })}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="Phone">
        <InputGroup>
          <Form.Control
            type="reason"
            placeholder="Why are you moving from your current place and When are you looking to move in?"
            {...register("reason", { required: false })}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="Phone">
        <InputGroup>
          <Form.Control
            type="current_status"
            placeholder="Current Status in Canada"
            {...register("current_status", { required: false })}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="Phone">
        <InputGroup>
          <Form.Control
            type="available"
            placeholder="When are you available to view the property?"
            {...register("available", { required: false })}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="Phone">
        <InputGroup>
          <Form.Control
            type="neighbourhood"
            placeholder="Property Address / Neighbourhood"
            {...register("neighbourhood", { required: false })}
          />
        </InputGroup>
      </Form.Group>

      <div className="mb-3">
        <Button variant="outline-primary" type="submit" className="w-100">
          Submit
        </Button>
      </div>
    </Form>
  )
}
