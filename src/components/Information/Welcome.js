/**
 * Creates a Welcome page that asks the user to login or continue as a guest
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

 import styles from "../../assets/Welcome.module.css";
 import { Link } from "react-router-dom";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { faCoffee } from "@fortawesome/free-solid-svg-icons";
 
 /**
  * The welcome page that shows if the user wants to login or continue as a guest
  * @returns This welcome page
  */
 const Welcome = () => {
     return (
         <div className={styles.content + " container-fluid"}>
             <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                 <div className="text-center ">
                     <FontAwesomeIcon size="3x" icon={faCoffee} />
                     <p className="mt-1 h4 mb-3">
                         Welcome to virtual card games!
                     </p>
                     <p className="mb-4 mt-1 h5"> Continue as...</p>
 
                     {/*Creates a link to the sign-in page when the user clicks the button*/}
                     <Link to="login" className="btn btn-primary btn-lg mr-2">
                         Login
                     </Link>
                     <Link to="games" className="btn btn-primary btn-lg ml-2">
                         Guest
                     </Link>
                     {/* span is used to add spacing between the buttons*/}
                 </div>
             </div>
         </div>
     );
 };
 
 export default Welcome;
 