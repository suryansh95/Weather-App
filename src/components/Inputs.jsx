import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";

function Inputs({ setQuery, units, setUnits }) {

  const [city, setCity] = useState("");
  const handleUnitChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    setCity("");
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6 input-section">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          placeholder="Search...."
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
        />
      </div>

      <UilSearch
        size={40}
        className="text-white cursor-pointer transition ease-out hover:scale-125"
        onClick={handleSearchClick}
      />
      
      <div className="flex flex-row space-x-2 items-center justify-center">
      <p className=" text-3xl text-white mx-1"> | </p>
        <UilLocationPoint
          size={25}
          className="text-white cursor-pointer location-icon hover:scale-125"
          onClick={handleLocationClick}
        />
         <p className=" text-3xl text-white mx-1"> | </p>
        <button
          name="metric"
          onClick={handleUnitChange}
          className="text-xl text-white font-light transition ease-out hover:scale-125"
        >
         
          °C
        </button>
        <p className="text-xl text-white mx-1"> | </p>
        <button
          name="imperial"
          onClick={handleUnitChange}
          className="text-xl text-white font-light transition ease-out hover:scale-125"
        >
          
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
