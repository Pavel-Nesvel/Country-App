import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import "../styles/countries.css";

export const Countries = () => {
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(36);
  const [selectedRadio, setSelectedRadio] = useState("");
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setData(response.data));
  }, []);

  return (
    <div className="container">
      <div className="countries">
        <ul className="radio_container">
          <input
            type="range"
            min="1"
            max="250"
            defaultValue={rangeValue}
            onChange={(e) => setRangeValue(e.target.value)}
          /> {rangeValue}
          {radios.map((continent, key) => (
            <li key={key}>
              <input
                type="radio"
                checked={continent === selectedRadio}
                id={continent}
                name="continentRadio"
                onChange={(e) => setSelectedRadio(e.target.id)}
              />
              <label htmlFor={continent}>{continent}</label>
            </li>
          ))}
        </ul>
        {selectedRadio && (
          <button onClick={() => setSelectedRadio("")}>
            Annuler la recherche
          </button>
        )}
        <ul>
          {data
            .filter((country) => country.continents[0].includes(selectedRadio))
            .sort((a, b) => b.population - a.population)
            .slice(0, rangeValue)
            .map((country, key) => (
              <Card country={country} key={key} />
            ))}
        </ul>
      </div>
    </div>
  );
};
