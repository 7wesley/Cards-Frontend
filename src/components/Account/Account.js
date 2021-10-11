/**
 * Creates the account page that allows users to manage their account
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import React, { useState, useCallback } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import styles from "../../assets/Information.module.css";
import { useAuth } from "../../contexts/AuthContext";
import useQueryDocs from "../../hooks/useQueryDocs";
import { Modal } from "react-bootstrap";
import ConfirmModal from "../Templates/ConfirmModal";

import {connect} from "react-redux"
import { setUsername } from "../../actions";
import {store} from "../../store.js"
import { useDispatch } from "react-redux";

/**
 * The Account Page that will be displayed
 * @param {any} id the id of the player that uses this account page
 * @param {any} updateStorage for updating the user's information
 * @returns the account page that will be displayed
 */
const Account = ({ /**id,**/ /**updateStorage**/ }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { currentUser, logout, upload, updateProfile } = useAuth();
    const [updated, setUpdated] = useState(false);
    const { docs } = useQueryDocs("users", currentUser, updated);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();

    const id = store.getState().user.username
    const dispatch = useDispatch()

    //Updates the user's name
    const handleSetUsername = (newName) => {
        dispatch(setUsername("Reset the guest username", newName));
    };



    const closeModal = useCallback(() => {
        setModalOpen(false);
    }, [setModalOpen]);

    /**
     * Logs the current user out when called
     */
    const handleLogout = async () => {
        setError("");
        try {
            await logout();
            history.push("/login");
        } catch {
            setError("Failed to log out");
        }
    };

    /**
     * Updates the information from the parameter that is passed (the player)
     * @param {any} e the player that will have their information updated
     */
    const handleUpdate = async (e) => {
        e.preventDefault(e);
        setError("");
        setSuccess("");
        try {
            if (e.target[0] && e.target[0].value) {
                if (currentUser) await updateProfile(e.target[0].value);

                //If the user updates their username
                else {
                    const newName =  e.target[0].value+"-"+Math.round(Math.random() * 100000);

                    //Update the information on the store
                    handleSetUsername(newName)

                    //Update the user's info through a function
                    // updateStorage({
                    //     username:
                    //         e.target[0].value +
                    //         "-" +
                    //         Math.round(Math.random() * 100000),
                    // });
                }
            }
            if (e.target[1] && e.target[1].files)
                await upload(e.target[1].files[0]);
            setSuccess("Updated successfully!");
            setUpdated(!updated);
        } catch (e) {
            if (typeof e == "object") setError(e.message);
            else setError("Failed to login!");
        }
    };

    return (
        <div className={styles.redBlock}>
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                    <h5 className="text-light">Account</h5>
                </div>
            </div>
            <div className="container mt-5">
                <div className="mx-auto col-md-8 col-sm-10 col-xs-12">
                    <Form onSubmit={handleUpdate}>
                        

                        {!currentUser ? (

                            // If the user is not logged in
                            <p className="h3" data-cy="createAccountText">
                                Want more features?{" "}
                                <Link to="/login">Create an account</Link>
                            </p>
                        ) : (

                            // If the user is logged in
                            <p className="h3">You are a premium member!</p>
                        )}

                        {success && (
                            <Alert variant="success" data-cy="success">
                                {success}
                            </Alert>
                        )}
                        {error && <Alert variant="danger">{error}</Alert>}

                        {/* text box for Changing the user's name */}
                        <Form.Group className="mt-4">
                            <Form.Label>Change username</Form.Label>
                            <Form.Control
                                placeholder={id}
                                type="text"
                                data-cy="usernameInput"
                            />
                        </Form.Group>

                        {/* For changing the user's profile picture */}
                        {currentUser && (
                            <Form.Group data-cy="profilePicture">
                                <p>Change profile picture</p>
                                <img
                                    className="w-25 rounded mb-3"
                                    src={
                                        docs && docs.picture
                                            ? docs.picture
                                            : "/Images/blankProfile.png"
                                    }
                                    alt="User profile"
                                />
                                <Form.Control type="file" />
                            </Form.Group>
                        )}

                        {/* For submitting the updated info */}
                        <div>
                            <Button type="submit" data-cy="updateButton">
                                Update
                            </Button>
                            {currentUser && (
                                <Button
                                    variant="danger"
                                    onClick={() => setModalOpen(true)}
                                    data-cy="deleteButton"
                                    className="ml-2"
                                >
                                    Delete
                                </Button>
                            )}
                        </div>

                        {/* Logs the user out */}
                        {currentUser && (
                            <div className="text-center">
                                <Button
                                    className="text-center"
                                    variant="link"
                                    onClick={handleLogout}
                                >
                                    Log out
                                </Button>
                            </div>
                        )}
                    </Form>
                </div>
            </div>
            <Modal data-cy="hostModal" show={modalOpen} onHide={closeModal}>
                <ConfirmModal closeModal={closeModal} id={id} />
            </Modal>
        </div>
    );
};

//Any time the store is updated, this function is called for this component
const mapStateToProps = state => {
    return state
    // {...state, 
    //     user: {
    //         username: "new name"
    // }} 
}
  
  
//Makes a call to the reducer so that it can tell the store to update state
//This function is called whenever this component receives new props
const mapDispatchToProps = dispatch => {
    return {
        // modifyState: (username1) => dispatch(setUser("Clicked something on Routing page"), {...store.getState(), 
        //     username: username1,
        //     stats: {
        //         wins: 0,
        //         losses: 0,
        //         played: 0
        //     }
        // })   
        modifyState: () => dispatch(setUsername("Clicked something on Account page"), "new name")   
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Account);