/**
 * Starts and runs the connection to the website
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import "../assets/App.css";
import Routing from "./Routing";
import { AuthProvider } from "../contexts/AuthContext";

/**
 * Where the app is being run
 */
const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Routing />
      </AuthProvider>
    </div>
  );
};

export default App;
