import '../assets/App.css';
import React, { useState, useEffect } from 'react';
import Routing from './Routing';
import { AuthProvider } from "../contexts/AuthContext";

function App() {

    return (
      <div className="App">
          <AuthProvider>
            <Routing />
        </AuthProvider>
      </div>
    );
}

export default App;
