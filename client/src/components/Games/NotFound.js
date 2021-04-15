import styles from '../../assets/Transitions.module.css'
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className = {styles.bgInProgress}>
            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center" >
                <div className="text-center text-light">
                    <p className = "h3">Room not found</p>
                    <p className = "h6">Either the room was deleted or it does not exist</p>
                    <Link to = "/games" className = "btn btn-primary mt-3">Active games</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound;