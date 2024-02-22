import React, { useEffect, useState } from "react";
import "./style.css"

const TempApp = () => {

    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchApi = async () => {

            let api = `https:api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=dbd907bd55ff95f3c244f283f6b1c272
            `;
            const response = await fetch(api);
            const Response = await response.json();
            setCity(Response.main)
        }

        fetchApi();
    }, [search])

    return (
        <>
            <div className="box">
                <div className="inputData">
                    <input type="search" value={search} placeholder="Enter city name.." className="inputField" onChange={(e) => {
                        setSearch(e.target.value)
                    }} />
                </div>

                {
                    !city ? (
                        <p className="errorMsg">No Data Found</p>
                    ) : (
                        <div className="info">
                            <h2 className="location center">
                                <i className="fa-solid fa-street-view"></i> {search}
                            </h2>
                            <h1 className="temp center">
                                {city.temp}° C
                            </h1>
                            <h3 className="tempmin_max center">Min : {city.temp_min}° C | Max : {city.temp_max}° C</h3>
                        </div>


                    )
                }


            </div>
        </>
    )
}

export default TempApp;