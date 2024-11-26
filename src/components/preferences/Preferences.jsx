import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import {PreferencesContext} from "../../context/PreferencesContext";
import "./Preferences.css"
import Button from "../button/Button.jsx";
import {useNavigate} from "react-router-dom";

function Preferences() {
    const navigate = useNavigate();
    const [preferencesList, setPreferencesList] = useContext(PreferencesContext)
    const {register, handleSubmit, watch} = useForm({
        defaultValues: {
            temperature: preferencesList.preferredWeather.temperature,
            cloudiness: preferencesList.preferredWeather.cloudiness,
            windspeed: preferencesList.preferredWeather.windspeed,
        }
    })

    const watchCloudiness = watch("cloudiness")
    const watchWindspeed = watch("windspeed")

    const onSubmit = data => {
        console.log("voorkeur", data);
        if (data) {
            let uniqueId =
                new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
            let newPreferences = {
                id: uniqueId,
                preferredWeather: data,
            };
            setPreferencesList(newPreferences);
            localStorage.setItem('preferences', JSON.stringify(newPreferences));

            navigate('/');
        }
    };

    return (
      <main>
            <form onSubmit={handleSubmit(onSubmit)}>
                <article>
                    <p>Temperatuurvoorkeur</p>
                    <p>Koud - warm<input type="range" placeholder="temperature" {...register("temperature", {})}/>
                    </p>
                </article>
                <article>
                    <p>Bewolking:{watchCloudiness}%</p>
                    <input type="range" placeholder="cloudiness"{...register("cloudiness", {})}/>
                </article>
                <article>
                    <p>Windkracht: {watchWindspeed}</p>
                    <input type="range" placeholder="windspeed" max="12" {...register("windspeed", {})}/>
                </article>
                <div className="button-container" >
                <Button
                    className='preferences-button'
                    type="submit"
                    text='Opslaan'
                />
                </div>
            </form>

        </main>
    )
}

export default Preferences