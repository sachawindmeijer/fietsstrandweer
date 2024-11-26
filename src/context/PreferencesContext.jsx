import React, { createContext, useState, useEffect } from "react";

export const PreferencesContext = createContext(null);

const PreferencesContextProvider = ({ children }) => {
    const [preferencesList, setPreferencesList] = useState({
        preferredWeather: {
            temperature: 0,
            cloudiness: 0,
            windspeed: 0,
        },
    });

    useEffect(() => {

        const storedPreferences = localStorage.getItem("preferences");
        if (storedPreferences && storedPreferences !== "undefined") {
            try {
                const parsedPreferences = JSON.parse(storedPreferences);
                setPreferencesList(parsedPreferences);
            } catch (error) {
                console.error("Error parsing preferences from localStorage", error);
            }
        }
    }, []);

    useEffect(() => {
        // Sla de voorkeursgegevens op in localStorage wanneer deze worden bijgewerkt.
        localStorage.setItem("preferences", JSON.stringify(preferencesList));
    }, [preferencesList]);

    return (
        <PreferencesContext.Provider value={[preferencesList, setPreferencesList]}>
            {children}
        </PreferencesContext.Provider>
    );
};

export default PreferencesContextProvider;