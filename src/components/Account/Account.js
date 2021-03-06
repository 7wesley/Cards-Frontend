import React, { useState, useCallback } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useQueryDocs from "../../hooks/useQueryDocs";
import { Modal } from "react-bootstrap";
import ConfirmModal from "../Templates/ConfirmModal";

/**
 * Allows users to manage their account info
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/12/2021
 * @param {*} id the id of the player that uses this account page
 * @param {*} updateStorage for updating the user's information
 */
const Account = ({ id, updateStorage }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { currentUser, logout, upload, updateProfile } = useAuth();
  const [updated, setUpdated] = useState(false);
  const { docs } = useQueryDocs("users", currentUser, updated);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

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
   * @param {*} e the player that will have their information updated
   */
  const handleUpdate = async (e) => {
    e.preventDefault(e);
    setError("");
    setSuccess("");
    try {
      if (e.target[0] && e.target[0].value) {
        if (currentUser) await updateProfile(e.target[0].value);
        else {
          updateStorage({
            username: e.target[0].value + Math.round(Math.random() * 10000),
          });
        }
      }
      if (e.target[1] && e.target[1].files) await upload(e.target[1].files[0]);
      setSuccess("Updated successfully!");
      setUpdated(!updated);
    } catch (e) {
      if (typeof e == "object") setError(e.message);
      else setError("Failed to login!");
    }
  };

  return (
    <div className="red-block">
      <div className="d-flex justify-content-center align-items-center h-100">
        <h5 className="text-light">Account</h5>
      </div>
      <div className="container mt-5">
        <div className="mx-auto col-md-8 col-sm-10 col-xs-12">
          <Form onSubmit={handleUpdate}>
            {!currentUser ? (
              <p className="h3" data-cy="createAccountText">
                Want more features? <Link to="/login">Create an account</Link>
              </p>
            ) : (
              <p className="h3">You are a premium member!</p>
            )}

            {success && (
              <Alert variant="success" data-cy="success">
                {success}
              </Alert>
            )}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mt-4">
              <Form.Label>Change username</Form.Label>
              <Form.Control
                placeholder={id}
                type="text"
                data-cy="usernameInput"
              />
            </Form.Group>
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

export default Account;
