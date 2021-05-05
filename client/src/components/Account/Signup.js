import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const { signup } = useAuth();

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
                            { error && <Alert variant="danger">{error}</Alert> }
                            { success && <Alert variant="success">{success}</Alert> }
                            <Form onSubmit={ handleSignup }>
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type = "text" placeholder = "Enter username here" required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type = "email" placeholder = "Enter email here" required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type = "password" placeholder = "Enter password here" required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control type="password" placeholder = "Confirm password here" required ></Form.Control>
                                </Form.Group>
                                <Button disabled = {loading} className = "btn-danger w-100" type = "submit">Submit</Button>
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