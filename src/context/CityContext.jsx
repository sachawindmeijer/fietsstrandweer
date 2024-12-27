import React, { createContext, useState, useEffect } from "react";

export const CityContext = createContext(null);

function CityContextProvider({ children }) {
    const [cityList, setCityList] = useState([]);

    useEffect(() => {
        const storedCities = JSON.parse(localStorage.getItem('cities'));
        if (storedCities) {
            setCityList(storedCities);
        }
    }, []);

    return (
        <CityContext.Provider value={[cityList, setCityList]}>
            {children}
        </CityContext.Provider>
    );
}

export default CityContextProvider;