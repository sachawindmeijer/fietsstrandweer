import {createContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext({});


function AuthContextProvider({children}) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    useEffect(() => {
        console.log('auth', isAuth);
    }, [isAuth]);


    useEffect(() => {

        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwt_decode(token);
            fetchUserData(decoded.sub, token);
        } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, []);

    function login(JWT) {

        localStorage.setItem('token', JWT);
        const decoded = jwt_decode(JWT);
        fetchUserData(decoded.sub, JWT, '/profiel');
        navigate('/profiel');
    }

    function logout() {
        localStorage.clear();
        console.log('Local storage after clear:', localStorage);
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
        navigate('/loguit');
    }


    const apiKey = import.meta.env.VITE_APP_DATA_API_KEY;
    async function fetchUserData(id, token, redirectUrl) {
        try {
            const response = await axios.get(`https://api.datavortex.nl/fietsweerapp/users/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': `fietsweerapp:${apiKey}`,
                    'Authorization': `Bearer ${token}`
                }
            });

            toggleIsAuth({
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                },
                status: 'done',
            });

            if (redirectUrl) {
                navigate(redirectUrl);
            }
        } catch (e) {
            console.error("Failed to fetch user data:", e);
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    const contextData = {
        ...isAuth,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;

