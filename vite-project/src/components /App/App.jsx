import { useState } from "react";
import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  return (
    <div className="app">
      <Header />
      <Main weatherData={weatherData} />
      <Footer />
    </div>
  );
}

export default App;
