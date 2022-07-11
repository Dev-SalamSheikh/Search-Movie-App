import { useFirebase } from "../context/Firebase";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const Login = () => {
  const firebase = useFirebase();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await firebase.signinUserWithEmailAndPassword(email, password);
      navigate("/home");
    } catch (err) {
      console.log(err);
      setError(<h3 style={{ textAlign: "center" }}>No User Found</h3>);
    }
  };

  return (
    <Container
      style={{ height: "100vh" }}
      className="d-flex align-items-center justify-content-center flex-column bg-dark text-white"
    >
      <div className="box">
        <h2 className="mb-3">Log in your Account</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <hr />
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account?{" "}
        <Link style={{ textDecoration: "none" }} to="/signup">
          Sign Up
        </Link>
      </div>
    </Container>
  );
};

export default Login;
