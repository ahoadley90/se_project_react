import { checkResponse } from "./Api";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  )
    .then(checkResponse)
    .then((data) => {
      console.log("Raw weather API response:", data); // Add this line
      const filteredData = filterWeatherData(data);
      if (!filteredData) {
        throw new Error("Failed to process weather data");
      }
      return filteredData;
    });
};

export const filterWeatherData = (data) => {
  if (!data || !data.main || !data.weather || !data.sys) {
    console.error("Unexpected weather data structure:", data);
    return null;
  }

  const result = {};
  result.city = data.name || "Unknown";
  result.temp = {
    F: Math.round(data.main.temp) || 0,
    C: Math.round(((data.main.temp - 32) * 5) / 9) || 0,
  };
  result.type = getWeatherType(data.main.temp);
  result.condition =
    (data.weather[0] && data.weather[0].main.toLowerCase()) || "unknown";
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

export const isDay = ({ sunrise, sunset }, currentTime) => {
  return sunrise * 1000 < currentTime && currentTime < sunset * 1000;
};
export const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature <= 85) {
    return "warm";
  } else {
    return "cold";
  }
};
