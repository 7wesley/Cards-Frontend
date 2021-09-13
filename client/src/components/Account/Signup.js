/**
 * Creates a Signup page that allows users to create an account
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';

/**
 * Creates the SignUp page that the users can use to create an account
 * @returns The SignUp webpage
 */
const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { signup } = useAuth();

    /**
     * The page that allows the users to create an account
     * @param {*} e the user that is creating an account
     * @returns an error if any information does not align, otherwise
     *          returns textboxes that allow users to create a password,
     *              enter a username, and enter an email for their new account
     */
    const handleSignup = async (e) => {
        e.preventDefault();
        if (e.target[2].value !== e.target[3].value)
            return setError("Passwords do not match!");
        const doc = db.collection('usernames').doc(e.target[0].value);
        if (doc.exists) 
            return setError("Username taken");
        setSuccess(false);
        setError('');
        try {
            setLoading(true);
            await signup(e.target[0].value, e.target[1].value, e.target[2].value)
            setSuccess("Success");
        } catch (e) {
            if (typeof e == 'object')
                setError(e.message);
            else
                setError(e)
        }
        setLoading(false);
    }

    return (
        <>
            <div className = "login">
                <div className = "container pt-5">
                    <div className = "mx-auto col-xl-5 col-md-7 col-sm-10 col-xs-12">
                        <div className = "card p-4">
                            <p className = "h2 mb-4 text-center">Sign up</p>
                            { error && <Alert data-cy = "error" variant="danger">{error}</Alert> }
                            { success && <Alert data-cy = "success" variant="success">{success}</Alert> }
                            <Form onSubmit={ handleSignup }>
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control data-cy = "usernameInput" type = "text" placeholder = "Enter username here" required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control data-cy = "emailInput" type = "email" placeholder = "Enter email here" required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control data-cy = "passwordInput" type = "password" placeholder = "Enter password here" required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control data-cy = "confirmInput" type="password" placeholder = "Confirm password here" required ></Form.Control>
                                </Form.Group>
                                <Button data-cy = "submitButton" disabled = {loading} className = "btn-danger w-100" type = "submit">Submit</Button>
                            </Form>
                            <p className = "text-center mt-3 mb-0">Have an account? <Link to = "/login">Log in</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;