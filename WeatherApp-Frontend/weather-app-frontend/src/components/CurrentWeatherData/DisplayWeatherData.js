import React from "react";
import { BsEye, BsWater, BsThermometer, BsWind } from "react-icons/bs";
import {
  WiCelsius,
  WiSunrise,
  WiSunset,
  WiWindDeg,
  WiBarometer,
  WiDegrees,
} from "react-icons/wi";
import { TbWorldLatitude, TbWorldLongitude } from "react-icons/tb";

const DisplayWeatherData = ({ apiResponse }) => {
  //getting the icon from the weather response
  let iconCode = apiResponse.icon;
  console.log(iconCode);

  //generating image url with the icone code
  let iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@4x.png";

  return (
    <div>
      {/* card top */}
      <div className="flex items-center gap-x-5">
        {/* icon */}
        <div className="text-[87px]">
          <img class="min-w-3xl animate-pulse" src={iconUrl} />
        </div>
        <div>
          {/* city name, country code */}
          <div className="text-2xl font-semibold">
            {apiResponse.city.name}, {apiResponse.city.country.countryCode}
          </div>
          {/* date */}
          <div>Last Updated: {apiResponse.updatedOn}</div>
        </div>
      </div>

      {/* card body */}
      <div className="my-10">
        <div className="flex justify-center items-center">
          {/* temp */}
          <div className="text-[144px] leading-none font-light">
            {parseInt(apiResponse.temp)}
          </div>
          {/* celsius icon */}
          <div className="text-6xl">
            <WiCelsius />
          </div>
        </div>
        {/* weather description */}
        <div className="capitalize text-center">
          {apiResponse.description}
          <br />
          {/* weather cloudiness */}
          Cloudiness {apiResponse.cloudsAll} %
        </div>
      </div>

      {/* card bottom */}
      <div className="my-20 text-[24px] bottom-holder max-w-[378px] mx-auto flex flex-col gap-y-6">
        {/* Wind Speed */}
        <div className="flex justify-between">
          <div className="flex items-center gap-x-2">
            <div className="text-[20px]">
              <BsWind />
            </div>
            <div>
              Wind Speed{" "}
              <span className="ml-2">{apiResponse.windSpeed} m/s</span>
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="flex justify-between">
          <div className="flex items-center gap-x-2">
            <div className="text-[20px]">
              <BsDroplet />
            </div>
            <div>
              Humidity <span className="ml-2">{apiResponse.humidity} %</span>
            </div>
          </div>
        </div>

        {/* Visibility */}
        <div className="flex justify-between">
          <div className="flex items-center gap-x-2">
            <div className="text-[20px]">
              <BsEye />
            </div>
            <div>
              Visibility{" "}
              <span className="ml-2">{apiResponse.visibility / 1000} km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayWeatherData;
