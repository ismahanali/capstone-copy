import React, { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import DisplayWeatherData from "./DisplayWeatherData";
import { getWeatherDataApi } from "../../util/ApiUtil";
import { toast } from "react-hot-toast";

const WeatherData = ({ currentUser }) => {
  const [data, setData] = useState(null);

  const [location, setLocation] = useState("toronto");

  const [inputValue, setInputValue] = useState(false);

  const [animate, setAnimate] = useState(false);

  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const [tokenExpired, setTokenExpired] = useState(false);

  const [save, setSave] = useState(false);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (inputValue !== "") {
      setLocation(inputValue);
      setSave(true);
    }

    const input = document.querySelector("input");
    if (input.value === "") {
      toast("Please enter a city name");
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    input.value = "";
    e.preventDefault();
  };
  useEffect(() => {
    setLoading(true);
    getWeatherDataApi(currentUser.token, location, save)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 100);
      })

      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
        console.log(err);
        if (err.response.data.httpStatusCode === 401) {
          setTokenExpired(true);
        }
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  if (!data) {
    return (
      <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center item-center">
        <div>
          <LoadingIndicator />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      {errorMsg && (
        <div className="w-full max-w-[90vw] lg:max-w-[450px] bg-slate-100 text-white absolute top-2 lg:top-30 p-3 capitalize rounded-md">
          {`${errorMsg.response.data.message}`}
        </div>
      )}
      <form
        className={`${
          animate ? "animate-shake" : "animate-none"
        } h-16 bg-black/30 w-full max-w-[700px] rounded-full backdrop-blur-[32px] mb-10 mt-5`}
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            onChange={(e) => handleInput(e)}
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full"
            type="text"
            placeholder="Search by city"
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-sky-500 hover:bg-slate-600 focus:bg-slate-300 w-20 h-12 rounded-full flex justify-center items-center transition"
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      <div className="w-full max-w-[700px] bg-black/20 min-h-[584px] text-slate-100 backdrop-blur-[80px] rounded-[60px] py-12 px-3">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <LoadingIndicator />
          </div>
        ) : (
          <div>
            <DisplayWeatherData apiResponse={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherData;
