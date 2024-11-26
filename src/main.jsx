import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css'
import AuthContextProvider from "./context/AuthContext.jsx";
import App from "./App.jsx";
import PreferencesContextProvider from "./context/PreferencesContext.jsx";
import CityContextProvider from "./context/CityContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <CityContextProvider>
                <AuthContextProvider>
                    <PreferencesContextProvider>
                        <App/>
                    </PreferencesContextProvider>
                </AuthContextProvider>
            </CityContextProvider>
        </Router>
    </React.StrictMode>,
);
