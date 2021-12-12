import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

/**
 * The home page where user's are first brought to
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 12/12/2021
 */
const Welcome = () => {
  return (
    <>
      <div className="welcome-bg" />
      <div className="welcome-container text-center">
        <FontAwesomeIcon size="3x" icon={faGamepad} />
        <p className="mt-1 h2 mb-3">Multiplayer card games</p>
        <div className="mt-4">
          <Link to="login" className="btn btn-primary btn-lg mr-2">
            Login
          </Link>
          <Link to="games" className="btn btn-primary btn-lg ml-2">
            Play
          </Link>
        </div>
      </div>
    </>
  );
};

export default Welcome;
