import { Form, Button, InputGroup } from "react-bootstrap"
import { useForm } from "react-hook-form"

export default function LoginForm({ onSubmit, defaultValues }) {
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
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <InputGroup>
          <Form.Control
            type="email"
            placeholder="Email Address"
            {...register("email", { required: true })}
          />
        </InputGroup>
      </Form.Group>

      <div className="mb-3">
        <Button
          variant="outline-primary"
          type="submit"
          className="w-100 rounded-pill"
        >
          Login
        </Button>
      </div>
    </Form>
  )
}
