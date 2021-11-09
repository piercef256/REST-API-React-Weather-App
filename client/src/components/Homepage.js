import "../style.css";
import { useState, useEffect } from "react";
import moment from "moment";
import {
  faLongArrowAltDown,
  faLongArrowAltUp,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Homepage() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [data, setData] = useState({
    forecast: [],
    location: "",
    current: "",
  });
  const [location, setLocation] = useState("");
  const [locationSubmit, setLocationSubmit] = useState("San Francisco");
  const [units, setUnits] = useState("fahrenheit");
  const [error, setError] = useState("");
  const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${locationSubmit}`;

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((json) => {
        setData({
          current: json.current,
          image: json.current.condition.icon,
          temp_f: json.current.temp_f,
          temp_c: json.current.temp_c,
          condition: json.current.condition.text,
          location: json.location,
          forecast: json.forecast.forecastday[0].day,
          datetime: json.location.localtime,
        });
      })
      .catch((error) => {
        setError("Invalid input");
      });
  }, [API_URL, locationSubmit]);

  return (
    <div className="homepage container text-center">
      <div className="top-inputs">
        <h1>Weather App</h1>
        <span className="error">{error}</span>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLocationSubmit(location);
            setError("");
          }}
        >
          <div className="location-input-div">
            <input
              type="text"
              className="form-control location-input"
              id="inputCity"
              placeholder="Enter city"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="submit"
              className="btn btn-success"
              onClick={() =>
                setUnits(units === "fahrenheit" ? "celcius" : "fahrenheit")
              }
            >
              {units === "fahrenheit" ? (
                <>
                  <span>&#176;C</span>
                </>
              ) : (
                <>
                  <span>&#176;F</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      <div>
        <hr />
      </div>

      <div className="display-data">
        <h2 className="mb-4">
          {data.location.name + ", " + data.location.region}
        </h2>
        <p>{moment(data.datetime).format("MMMM Do, h:mm A")}</p>
        <div className="current-image">
          <img className="forecast-image" src={data.image} alt="weather icon" />
        </div>
        <div className="condition-high-low">
          <div className="condition">
            <p>{data.condition}</p>
          </div>
          <div className="forecasts">
            <p>
              {units === "fahrenheit" ? (
                <>{data.forecast.maxtemp_f}</>
              ) : (
                <>{data.forecast.maxtemp_c}</>
              )}
              <span>&#176;</span>
              <span>
                <FontAwesomeIcon icon={faLongArrowAltUp} />
              </span>
            </p>
            <p>
              {units === "fahrenheit" ? (
                <>{data.forecast.mintemp_f}</>
              ) : (
                <>{data.forecast.mintemp_c}</>
              )}
              <span>&#176;</span>
              <span>
                <FontAwesomeIcon icon={faLongArrowAltDown} />
              </span>
            </p>
          </div>
        </div>

        <div className="current-div">
          <div className="current-temp">
            <h2>
              {units === "fahrenheit" ? (
                <>
                  {data.temp_f}
                  <span>&#176;</span>F
                </>
              ) : (
                <>
                  {data.temp_c}
                  <span>&#176;</span>C
                </>
              )}
            </h2>
            <p>
              Feels like:{" "}
              {units === "fahrenheit"
                ? data.current.feelslike_f
                : data.current.feelslike_c}
              <span>&#176;</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
