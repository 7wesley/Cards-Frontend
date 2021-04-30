import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import styles from '../../assets/Information.module.css';
import { useAuth } from '../../contexts/AuthContext'
import useQueryDocs from '../../hooks/useQueryDocs';
import useStorage from '../../hooks/useStorage'
import useSessionStorage from '../../hooks/useStorage';

const Account = ({id, updateStorage}) => {

    const { currentUser, logout, upload, updateProfile } = useAuth();
    const [updated, setUpdated] = useState(false);
    const { docs } = useQueryDocs("users", currentUser, updated);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleLogout = async () => {
        setError('');
        try {
            await logout();
            history.push('/login')
        } catch {
            setError('Failed to log out');
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault(e);
        setError('');
        setSuccess('');
        try {
            if (e.target[0] && e.target[0].value) {
                if (currentUser) 
                    await updateProfile(e.target[0].value);    
                else {
                    updateStorage({
                        username: e.target[0].value + '-' + Math.round((Math.random() * 100000))      
                    });
                }
            }
            if (e.target[1] && e.target[1].files) 
                await upload(e.target[1].files[0]);
            setSuccess('Updated successfully!');
            setUpdated(!updated);
        } catch (e) {
            if (typeof e == 'object')
                setError(e.message)
            else
                setError("Failed to login!")
        }
    }

    return (
        <div className = {styles.redBlock}>  
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                    <h5 className="text-light">
                        Account
                    </h5>
                </div>
            </div>
            <div className = "container mt-5">
                <div className = "mx-auto col-md-8 col-sm-10 col-xs-12">       
                    <Form onSubmit = { handleUpdate }>
                        {!currentUser ? 
                            <p className = "h3">Want more features? <Link to = "/login">Create an account</Link></p> 
                            : <p className = "h3">You are a premium member!</p>
                        }
                        { success && <Alert variant="success">{success}</Alert> }
                        { error && <Alert variant="danger">{error}</Alert> }
                        <Form.Group className = "mt-4"> 
                            <Form.Label>Change username</Form.Label>
                            <Form.Control placeholder = {id} type ="text" />
                        </Form.Group>
                    { currentUser &&
                        <Form.Group>
                            <p>Change profile picture</p>
                            <img className = "w-25 rounded mb-3" src = {docs && docs.picture ? docs.picture : "/Images/blankProfile.png"}/>
                            <Form.Control type="file" />
                        </Form.Group>
                    }
                    <Button type = "submit">Update</Button>
                    
                    { currentUser &&  
                    <div className = "text-center">
                        <Button className = "text-center" variant="link" onClick = {handleLogout}>Log out</Button>
                    </div>}
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Account;