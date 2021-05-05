import '../assets/App.css';
import Routing from './Routing';
import { AuthProvider } from "../contexts/AuthContext";

const App = () => {
    return (
        <div className = "App">
            <AuthProvider>
                <Routing />
            </AuthProvider>
        </div>
    )
}

export default App;