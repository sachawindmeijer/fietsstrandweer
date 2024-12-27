import React, { createContext, useState, useEffect } from "react";

export const LocationContext = createContext(null);

function LocationContextProvider({ children }) {
    const [locationList, setLocationList] = useState([]);

    useEffect(() => {
        const storedLocation = JSON.parse(localStorage.getItem('locations'));
        if (storedLocation) {
            setLocationList(storedLocation);
        }
    }, []);

    return (
        <LocationContext.Provider value={[locationList, setLocationList]}>
            {children}
        </LocationContext.Provider>
    );
}

export default LocationContextProvider;