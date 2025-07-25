"use client"

import { Form, Button, FloatingLabel, Spinner } from "react-bootstrap"
import { useForm } from "react-hook-form"

export default function LeadForm({ onSubmit, defaultValues, loading }) {
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
            {...register("phone", { required: true })}
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group>
        <FloatingLabel label="Number of Occupants" className="mb-3">
          <Form.Select {...register("occupants", { required: true })}>
            <option>Select an option...</option>
            <option value="Single Occupant">Single Occupant</option>
            <option value="2 Occupants">2 Occupants</option>
            <option value="3 Occupants">3 Occupants</option>
            <option value="4 Occupants">4 Occupants</option>
            <option value="5 Occupant">5 Occupants</option>
            <option value="6 Occupants">6 Occupants</option>
          </Form.Select>
        </FloatingLabel>
      </Form.Group>

      <Form.Group>
        <FloatingLabel label="Short Term or Long Term" className="mb-3">
          <Form.Select {...register("term", { required: true })}>
            <option>Select an option...</option>
            <option value="Less than 6 months">Less than 6 Months</option>
            <option value="1 Year - 2 Years">1 Year - 2 Years</option>
            <option value="2 Years - 4 Years">2 Years - 4 Years</option>
            <option value="4 Years +">4 Years +</option>
          </Form.Select>
        </FloatingLabel>
      </Form.Group>

      <Form.Group>
        <FloatingLabel label="Household Salary Range" className="mb-3">
          <Form.Select {...register("salary_range", { required: true })}>
            <option>Select an option...</option>
            <option value="$160,000/Year+">$160,000/Year+</option>
            <option value="$120,000/Year - $160,000/Year">
              $120,000/Year - $160,000/Year
            </option>
            <option value="$90,000/Year - $120,000/Year">
              $90,000/Year - $120,000/Year
            </option>
            <option value="$55,000/Year - $90,000/Year">
              $55,000/Year - $90,000/Year
            </option>
            <option value="$55,000/Year or Less">$55,000/Year or Less</option>
          </Form.Select>
        </FloatingLabel>
      </Form.Group>

      <Form.Group>
        <FloatingLabel label="Credit Score" className="mb-3">
          <Form.Select {...register("credit_score", { required: true })}>
            <option>Select an option...</option>
            <option value="800 to 850: Excellent">800 to 850: Excellent</option>
            <option value="740 to 799: Very good">740 to 799: Very good</option>
            <option value="670 to 739: Good">670 to 739: Good</option>
            <option value="580 to 669: Fair">580 to 669: Fair</option>
          </Form.Select>
        </FloatingLabel>
      </Form.Group>

      <Form.Group>
        <FloatingLabel label="Current Status in Canada" className="mb-3">
          <Form.Select {...register("current_status", { required: true })}>
            <option>Select an option...</option>
            <option value="Canadian Citizen / PR Card Holder">
              Canadian Citizen / PR Card Holder
            </option>
            <option value="Work Permit">Work Permit</option>
            <option value="Study Permit">Study Permit</option>
            <option value="Other">Other</option>
          </Form.Select>
        </FloatingLabel>
      </Form.Group>

      <Form.Group>
        <FloatingLabel label="Availability to view property?" className="mb-3">
          <Form.Select {...register("available", { required: true })}>
            <option>Select an option...</option>
            <option value="Weekdays">Weekdays</option>
            <option value="Weekends">Weekends</option>
          </Form.Select>
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          Why are you moving from your current place and When are you looking to
          move in?
        </Form.Label>
        <Form.Control
          type="textarea"
          {...register("reason", { required: true })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Property Address / Neighbourhood</Form.Label>

        <Form.Control
          type="textarea"
          {...register("neighbourhood", { required: true })}
        />
      </Form.Group>

      <div className="mb-3">
        <Button
          variant="outline-primary"
          type="submit"
          className="w-100"
          disabled={loading}
        >
          {loading ? <Spinner /> : "Submit"}
        </Button>
      </div>
    </Form>
  )
}
