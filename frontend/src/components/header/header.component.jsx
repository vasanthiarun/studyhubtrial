import { Navbar, Nav, Container } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
const Header = () => {
  return (
   <Fragment>
    <Navbar expand="lg" bg="light" className="border-bottom shadow-sm">
      <Container>
        {/* Brand on left */}
        <Navbar.Brand href="/">StudyHub</Navbar.Brand>

        {/* Hamburger toggler */}
        <Navbar.Toggle aria-controls="main-navbar-nav" />

        {/* Collapsible content */}
        <Navbar.Collapse id="main-navbar-nav">
          {/* Center menu */}
          <Nav className="mx-auto">
            <Nav.Link href="/question-bank">Question Bank</Nav.Link>
            <Nav.Link href="/academic-resources">Academic Resources</Nav.Link>
            <Nav.Link href="/discuss">Discuss</Nav.Link>
          </Nav>

          {/* Right side login/register */}
          <Nav className="ms-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Outlet />
    </Fragment>
  );
};

export default Header;
