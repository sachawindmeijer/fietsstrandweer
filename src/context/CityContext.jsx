import { createContext, useEffect, useState } from 'react';

export const CityContext=createContext(null)

function CitycontextProvider({children}) {
    const [citiesList, setCitieslist]=useState([])

    useEffect(() => {
        const citiesList=JSON.parse(localStorage.getItem('cities'));
        if (citiesList){
            setCitieslist(citiesList);
        }
    }, []);

    return (
        <CityContext.Provider value={[citiesList, setCitieslist]}>
            {children}
        </CityContext.Provider>
    )
}

export default CitycontextProvider