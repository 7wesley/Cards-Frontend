import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";

/**
 * Modal for deleting a user's account
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/12/2021
 * @param {*} closeModal - Closes this modal when called
 */
const ConfirmModal = ({ closeModal }) => {
  const history = useHistory();
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  const deleteAccount = async () => {
    setError("");
    try {
      let doc = await db.collection("users").doc(currentUser.uid).get();
      await db.collection("usernames").doc(doc.data().username).delete();
      await db.collection("users").doc(currentUser.uid).delete();
      await currentUser.delete();
      closeModal();
      history.push("/");
    } catch (e) {
      if (typeof e == "object") setError(e.message);
      else setError(e);
    }
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>Delete your account?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <p>This will permanently delete your account.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={closeModal}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={deleteAccount}
          data-cy="confirmButton"
        >
          Delete
        </Button>
      </Modal.Footer>
    </>
  );
};

export default ConfirmModal;
