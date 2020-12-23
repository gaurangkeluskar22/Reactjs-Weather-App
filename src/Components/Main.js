import React, { useEffect, useState } from "react";
import axios from "axios";
function Main() {
  const [search, setsearch] = useState("");
  const [searchweatherdata, setsearchweatherdata] = useState({});

  const fetchdata = async () => {
    if (search.trim()) {
      console.log(search);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=e11ee957319b252699b8964811b0089c`
      );

      console.log(await res.data);
      setsearchweatherdata(await res.data);
    }
  };
  useEffect(() => {
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition(async function (position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=e11ee957319b252699b8964811b0089c`
        );
        console.log(await res.data);
        setsearchweatherdata(await res.data);
      });
    }
  }, []);

  useEffect(() => {
    fetchdata();
  }, [search]);

  return (
    <div className="text-center box ">
      <div className="col-lg-12 col-sm-12 col-xs-12">
        <div>
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="searchfield mt-5 ml-2 mr-2 mb-2 p-3"
            onChange={(event) => setsearch(event.target.value)}
          ></input>
        </div>

        {searchweatherdata.id ? (
          <div className="m-2 mt-3 mb-5 databox">
            <h5 className="cityname pt-3">
              {searchweatherdata.name}, {searchweatherdata.sys.country}
            </h5>
            <h6 className="datacolor">{new Date().toDateString()}</h6>
            <center>
              <h6 className="temp pl-3 pr-3 pt-2 pb-2 mt-3 mb-1">
                {Math.round(searchweatherdata.main.temp)}°C
              </h6>
            </center>
            <h6 className="datacolor pt-4">
              MIN : {Math.round(searchweatherdata.main.temp_min)}°C | MAX :{" "}
              {Math.round(searchweatherdata.main.temp_max)}°C{" "}
            </h6>
            <h6 className="datacolor pb-3">
              Humidity: {searchweatherdata.main.humidity}
            </h6>
          </div>
        ) : (
          ""
        )}
        <div>&nbsp;</div>
      </div>
    </div>
  );
}

export default Main;
