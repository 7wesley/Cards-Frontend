import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "emailjs-com";
import { Alert, Form, Button } from "react-bootstrap";

/**
 * A page where users can send an email to the developers
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/12/2021
 */
const Contact = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  /**
   * Finds if the user entered the correct Captcha selection
   */
  const handleChange = () => {
    if (loading) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  /**
   * What happens when the users click the submit button
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAIL_SERVICE_ID,
        process.env.REACT_APP_EMAIL_TEMPLATE,
        e.target,
        process.env.REACT_APP_EMAIL_USER_ID
      );
      setSuccess("Email sent successfully!");
      e.target.reset();
    } catch (error) {
      setError(error.text);
    }
  };

  return (
    <>
      <div className="green-block">
        <div className="d-flex justify-content-center align-items-center h-100">
          <h5 className="text-light">Contact</h5>
        </div>
      </div>
      <div className="container mt-5">
        <div className="mx-auto col-md-8 col-sm-10 col-xs-12">
          <h2>Questions or concerns?</h2>
          {error && (
            <Alert data-cy="error" variant="danger">
              {error}
            </Alert>
          )}
          {success && (
            <Alert data-cy="success" variant="success">
              {success}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                data-cy="emailInput"
                type="email"
                placeholder="example@email.com"
                required
                name="email"
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>What should we know?</Form.Label>
              <Form.Control
                data-cy="messageInput"
                placeholder="Enter your comments here."
                name="message"
                type="text"
                minLength="1"
                required
              ></Form.Control>
            </Form.Group>
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_PUBLIC}
              onChange={handleChange}
            />
            <Button
              disabled={loading}
              className="w-100 mt-3 mb-2"
              type="submit"
              data-cy="submitButton"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Contact;
