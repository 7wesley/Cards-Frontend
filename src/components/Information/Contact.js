/**
 * Creates a Contact page that allows users to communicate with the creators of
 *  this website
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import React, { useState } from "react";
import styles from "../../assets/Information.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "emailjs-com";
import { Alert, Form, Button } from "react-bootstrap";

/**
 * The page that contains information about contacting the creators of the site
 * @returns This contact page
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
            <div className={styles.greenBlock}>
                <div className="container h-100">
                    <div className="row h-100 justify-content-center align-items-center">
                        <h5 className="text-light">Contact</h5>
                    </div>
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
                            className="w-100 mt-3"
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
