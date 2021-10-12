/**
 * Creates a Login page that allows users to login with an account
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/**
 * The page that will be displayed for logging in
 * @returns the webpage that is created
 */
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, currentUser } = useAuth();
  const history = useHistory();

  /**
   * Takes care of a user logging in
   * @param {*} e The user that will login
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(e.target[0].value, e.target[1].value);
      history.push("/account");
    } catch (e) {
      if (typeof e == "object") setError(e.message);
      else setError("Failed to login!");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser) history.push("/account");
  }, [currentUser, history]);

  return (
    <>
      <div className="login">
        <div className="container pt-5">
          <div className="mx-auto col-xl-5 col-md-7 col-sm-10 col-xs-12">
            <div className="card p-4">
              <p className="h2 mb-4 text-center">Login</p>
              {error && (
                <Alert variant="danger" data-cy="alert">
                  {error}
                </Alert>
              )}
              <Form onSubmit={handleLogin}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    data-cy="emailInput"
                    type="email"
                    placeholder="Enter username here"
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    data-cy="passwordInput"
                    type="password"
                    placeholder="Enter password here"
                    required
                  />
                </Form.Group>
                <Button
                  data-cy="submitButton"
                  disabled={loading}
                  className="btn-danger w-100"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
              <p className="text-center mt-3 mb-0">
                Need an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
