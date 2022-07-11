import { useFirebase } from "../context/Firebase";
import { Form, Container, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const Signup = () => {
  const firebase = useFirebase();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await firebase.signupUserWithEmailAndPassword(email, password);
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setError(
        <p style={{ textAlign: "center" }}>
          There is an error to create your account
        </p>
      );
    }
  };

  return (
    <Container
      style={{ height: "100vh" }}
      className="d-flex align-items-center justify-content-center flex-column bg-dark text-white"
    >
      <div className="p-4 box">
        <h2 className="mb-3">Create an Account</h2>
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
            <Button variant="primary" type="submit">
              Sign up
            </Button>
          </div>
        </Form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account?{" "}
        <Link style={{ textDecoration: "none" }} to="/">
          Login
        </Link>
      </div>
    </Container>
  );
};

export default Signup;
