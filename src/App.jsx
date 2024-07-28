// import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import SignIn from './pages/signin/SignIn.jsx';
import Register from './pages/register/Register.jsx';
// import { AuthContext } from './context/AuthContext';
import SignOut from "./pages/signout/SignOut.jsx";
import Profile from "./pages/profile/Profile.jsx";
// import NavBar from "./components/navbar/NavBar.jsx";
import "./App.css"


function App() {

    return (
        <>

                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/profiel" element={<Profile /> }/>
                    <Route path="/login" element={<SignIn />}/>
                    <Route path="/registreren" element={<Register />}/>
                    <Route path="/loguit" element={<SignOut />}/>
                </Routes>

        </>
    );
}

export default App;