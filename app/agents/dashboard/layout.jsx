import { Container } from "react-bootstrap"
import NavBar from "../../../components/agents/nav"

export default function DashboardLayout({ children }) {
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
