import {Route, Routes} from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import SignIn from './pages/signin/SignIn.jsx';
import Register from './pages/register/Register.jsx';
import SignOut from "./pages/signout/SignOut.jsx";
import Profile from "./pages/profile/Profile.jsx";
import "./App.css"



function App() {

    return (
        <div className="app">
                <Routes>

                    <Route path="/" className="nav-button" element={<Home/>}/>
                    <Route path="/profiel" className="nav-button" element={<Profile/>}/>
                    <Route path="/login" className="nav-button" element={<SignIn/>}/>
                    <Route path="/registreren" className="nav-button" element={<Register/>}/>
                    <Route path="/loguit" className="nav-button" element={<SignOut/>}/>

                </Routes>

        </div>
    );
}

export default App;