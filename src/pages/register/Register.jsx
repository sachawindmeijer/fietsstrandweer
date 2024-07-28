import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form'
import axios from 'axios';
import HeaderWeather from "../../components/header/headerWeather.jsx";
import NavBar from "../../components/navbar/NavBar.jsx";
import {ErrorMessage} from "@hookform/error-message";
import "./Register.css"

function Register() {
    // hookform voor het formulier
    const {
        handleSubmit,
        formState: {errors},
        register
    } = useForm({
        criteriaMode: "all"
    });

    // state voor functionaliteit
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const navigate = useNavigate();

    // we maken een canceltoken aan voor ons netwerk-request
    const source = axios.CancelToken.source();

    // mocht onze pagina ge-unmount worden voor we klaar zijn met data ophalen, aborten we het request
    useEffect(() => {
        return function cleanup() {
            source.cancel();
        }
    }, []);

    async function onSubmit(data) {
        console.log(data)
        toggleError(false);
        toggleLoading(true);

        try {
            await axios.post('`https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                email: data.email,
                username: data.username,
                password: data.password
            }, {
                cancelToken: source.token,
            });

            // als alles goed gegaan is, linken we door naar de login-pagina
            navigate('/login');
        } catch (e) {
            console.error(e);
            toggleError(true);
        }

        toggleLoading(false);
    }

    return (
        <div className="background">
            <HeaderWeather/>
            <NavBar/>
            <div className="outer-container">
                <section className="form-container">
                    <p>Het het formulier in om je te kunnen aanmeleden</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                        <label htmlFor="email-field" className="input-container">
                            Gebruikersnaam:
                            <input
                                type="text"
                                id="username-field"
                                {...register("username", {
                                    required: "Dit moet ingevuld zijn",
                                })}
                                className="input-field"
                            />
                            <ErrorMessage
                                errors={errors}
                                name="username"
                                render={({message}) => <p>{message}</p>}
                            />
                        </label>

                        <label htmlFor="email-field" className="input-container">
                            E-mail:
                            <input
                                type="text"
                                id="E-mail-field"
                                {...register("email", {
                                    required: "Dit moet ingevuld zijn",
                                    pattern: {
                                        value: /^(.+)@(.+)$/,
                                        message: "er mist nog een @"
                                    }
                                })}
                                className="input-field"
                            />
                            <ErrorMessage
                                errors={errors}
                                name="email"
                                render={({message}) => <p>{message}</p>}
                            />
                        </label>

                        <label htmlFor="email-field" className="input-container">
                            Wachtwoord:
                            <input
                                type="password"
                                id="password-field"
                                {...register("password", {
                                    required: "Dit moet ingevuld zijn",
                                    minLength: {
                                        value: 6,
                                        message: "Het wachtwoord is te kort"
                                    }
                                })}
                                className="input-field"
                            />
                            <ErrorMessage
                                errors={errors}
                                name="password"
                                render={({message}) => <p>{message}</p>}
                            />
                        </label>
                        {error && <p className="error">Dit account bestaat al. Probeer een ander emailadres.</p>}
                        <button
                            type="submit"
                            className="button"
                            disabled={loading}
                        >
                            Registreren
                        </button>

                    </form>
                </section>
                <p>Heb je al een account? Je kunt je <Link to="/login">hier</Link> inloggen.</p>
            </div>
        </div>
    );
}

export default Register;