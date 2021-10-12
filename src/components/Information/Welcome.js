/**
 * Creates a Welcome page that asks the user to login or continue as a guest
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 10/7/2021
 */

import styles from "../../assets/Welcome.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { testAction } from "../../actions";

//For reference only
//For importing state from the store
/*
import { useSelector } from 'react-redux';
function App() {
  const birds = useSelector(state => state.birds);
}
*/

/**
 * The welcome page that shows if the user wants to login or continue as a guest
 * @returns This welcome page
 */
const Welcome = (props) => {
  // constructor(props) {
  //     super(props);
  //     this.state:{lightOn: false};
  //     this.OnClick = this.OnClick.bind(this);
  // }

  return (
    <div className={styles.content + " container-fluid"}>
      {/* <div>
            <h1>Redux Hello World</h1>
            <h3>State value from Props = {props.stateValue}</h3>
    
            <button onClick={props.modifyState}>Add Lastname </button>
        </div> */}

      <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <div className="text-center ">
          <FontAwesomeIcon size="3x" icon={faCoffee} />
          <p className="mt-1 h4 mb-3">Welcome to virtual card games!</p>
          <p className="mb-4 mt-1 h5"> Continue as...</p>

          {/*Creates a link to the sign-in page when the user clicks the button*/}
          <Link
            onClick={props.modifyState}
            to="login"
            className="btn btn-primary btn-lg mr-2"
          >
            Login
          </Link>
          <Link
            onClick={props.modifyState}
            to="games"
            className="btn btn-primary btn-lg ml-2"
          >
            Guest
          </Link>
          {/* span is used to add spacing between the buttons*/}
        </div>
      </div>
    </div>
  );
};

//Any time the store is updated, this function is called for this component
const mapStateToProps = (state) => {
  return state;
  // {
  //     stateValue: state
  //   }
};

//Makes a call to the reducer so that it can tell the store to update state
//This function is called whenever this component receives new props
const mapDispatchToProps = (dispatch) => {
  return {
    modifyState: () =>
      dispatch(testAction("Clicked something on welcome page")),
  };
};

//Connects this App component with the Redux store.
//exports the App object with the values from te store
export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
