/**
 * Creates a page that is displayed if a game room that is trying to be connected
 *  to cannot be found
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import styles from "../../assets/Transitions.module.css";
import { Link } from "react-router-dom";

/**
 * If for some reason the room th user is trying to join can't be found
 *      the user will be directed to this page
 * @returns The webpage that will be displayed
 */
const NotFound = () => {
    return (
        <div className={styles.bgInProgress}>
            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                <div className="text-center text-light">
                    <p className="h3">Room not found</p>
                    <p className="h6">
                        Either the room was deleted or it does not exist
                    </p>
                    <Link to="/games" className="btn btn-primary mt-3">
                        Active games
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
