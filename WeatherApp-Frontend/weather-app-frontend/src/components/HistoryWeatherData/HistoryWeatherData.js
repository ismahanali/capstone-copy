import React, { useState, useEffect } from "react";
import { getHistoryWeatherDataApi } from "../../util/ApiUtil";
import DisplayWeatherData from "../CurrentWeatherData/DisplayWeatherData";
import NoHistoryWeatherPresent from "./NoHistoryWeatherPresent";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const HistoryWeatherData = ({ currentUser }) => {
  const [results, setResults] = useState([]);
  const [tokenExpired, setTokenExpired] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyResults();
  }, []);

  const getMyResults = async () => {
    setLoading(true);
    const apiResponse = await getHistoryWeatherDataApi(currentUser.token);
    console.log(apiResponse);
    if (apiResponse && apiResponse.length > 0) {
      setResults(apiResponse);
      setData(true);
      setLoading(false);
    } else if (apiResponse && apiResponse.length === 0) {
      setData(false);
      setLoading(false);
    } else if (apiResponse.response.data.httpStatusCode === 401) {
      setTokenExpired(true);
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }
  if (data == false) {
    return (
      <div className="flex items-center justify-center">
        <NoHistoryWeatherPresent />
      </div>
    );
  } else {
    return (
      <div className="my-20 overflow-x-auto p-4 mt-3">
        <div className="flex space-x-5">
          {results.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-black/20 text-slate-100 backdrop-blur-[80px] py-12 px-6 rounded-[60px] overflow-hidden"
            >
              <DisplayWeatherData apiResponse={item} />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default HistoryWeatherData;
