import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import HeaderWeather from "../../components/header/headerWeather.jsx";
import NavBar from "../../components/navbar/NavBar.jsx";
import {ErrorMessage} from "@hookform/error-message";
import "./Register.css";
import Button from "../../components/button/Button.jsx";
import Footer from "../../components/footer/Footer.jsx";


function Register() {
    const {
        handleSubmit,
        formState: {errors},
        register
    } = useForm({
        criteriaMode: "all"
    });

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const navigate = useNavigate();

    async function onSubmit(data) {
        console.log('SUBMITTED', data);
        toggleError(false);
        toggleLoading(true);

        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                email: data.email,
                username: data.username,
                password: data.password,
                role: ["user"]
            });

            console.log('response', response);
            navigate('/login');
        } catch (e) {
            console.error(e);
            toggleError(true);
        }

        toggleLoading(false);
    }

    return (
        <div>
            <main>
                <div className="background">
                    <HeaderWeather/>
                    <NavBar/>
                    <div className="outer-container">
                        <section className="form-wrapper">
                            <p>Het het formulier in om je te kunnen aanmelden</p>
                            <form onSubmit={handleSubmit(onSubmit)} className="form">
                                <label htmlFor="username-field" className="input-container">
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
                                        id="email-field"
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

                                <label htmlFor="password-field" className="input-container">
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
                                {error &&
                                    <p className="error">Dit account bestaat al. Probeer een ander emailadres.</p>}
                                <Button
                                    className="buttonr"
                                    type="submit"
                                    disabled={loading}
                                    text='Registreren'
                                />
                            </form>
                        </section>
                        <p className="linkstekst">Heb je al een account? Je kunt je <Link
                            to="/login">hier</Link> inloggen.
                        </p>
                    </div>
                    <Footer/>
                </div>
            </main>
        </div>
    );
}

export default Register;