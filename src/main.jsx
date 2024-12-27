import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css'
import AuthContextProvider from "./context/AuthContext.jsx";
import App from "./App.jsx";
import PreferencesContextProvider from "./context/PreferencesContext.jsx";
import LocationContextProvider, {LocationContext} from "./context/LocationContext.jsx";




ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <LocationContextProvider>

                    <AuthContextProvider>
                        <PreferencesContextProvider>
                            <App/>
                        </PreferencesContextProvider>
                    </AuthContextProvider>

            </LocationContextProvider>
        </Router>
    </React.StrictMode>,
);
