import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext( {} );

function AuthContextProvider( { children } ) {
  const [ isAuth, toggleIsAuth ] = useState( {
    isAuth: false,
    user: null,
    status: 'pending',
  } );
  const navigate = useNavigate();

  // MOUNTING EFFECT
  useEffect( () => {
    // haal de JWT op uit Local Storage
    const token = localStorage.getItem( 'token' );

    // als er WEL een token is, haal dan opnieuw de gebruikersdata op
    if ( token ) {
      const decoded = jwt_decode( token );
      void fetchUserData( decoded.sub, token );
    } else {
      // als er GEEN token is doen we niks, en zetten we de status op 'done'
      toggleIsAuth( {
        isAuth: false,
        user: null,
        status: 'done',
      } );
    }
  }, [] );

  function login( JWT ) {
    // zet de token in de Local Storage
    localStorage.setItem( 'token', JWT );
    // decode de token zodat we de ID van de gebruiker hebben en data kunnen ophalen voor de context
    const decoded = jwt_decode( JWT );

    // geef de ID, token en redirect-link mee aan de fetchUserData functie (staat hieronder)
    void fetchUserData( decoded.sub, JWT, '/profiel' );
    // link de gebruiker door naar de profielpagina
    navigate('/profiel');
  }

  function logout() {
    localStorage.clear();
    toggleIsAuth( {
      isAuth: false,
      user: null,
      status: 'done',
    } );

    console.log( 'Gebruiker is uitgelogd!' );
    navigate( '/' );
  }

  // Omdat we deze functie in login- en het mounting-effect gebruiken, staat hij hier gedeclareerd!
  async function fetchUserData( id, token, redirectUrl ) {
    try {
      // haal gebruikersdata op met de token en id van de gebruiker
      const data = await axios.get( `https://frontend-educational-backend.herokuapp.com/api/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ token }`,
        },
      } );


      toggleIsAuth( {
        ...isAuth,
        isAuth: true,
        user: {
          username: data.data.username,
          email: data.data.email,
          id: data.data.id,
        //   data was eerst result
        },
        status: 'done',
      } );

      // als er een redirect URL is meegegeven (bij het mount-effect doen we dit niet) linken we hiernnaartoe door

      if ( redirectUrl ) {
        navigate( redirectUrl );
      }

    } catch ( e ) {
      console.error( e );
      // ging er iets mis? Plaatsen we geen data in de state
      toggleIsAuth( {
        isAuth: false,
        user: null,
        status: 'done',
      } );
    }
  }

  const contextData = {
    ...isAuth,
    login,
    logout
  };

  return (
      <AuthContext.Provider value={ contextData }>
        { isAuth.status === 'done' ? children : <p>Loading...</p> }
      </AuthContext.Provider>
  );
}

export default AuthContextProvider;