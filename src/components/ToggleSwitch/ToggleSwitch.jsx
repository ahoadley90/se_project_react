import "./ToggleSwitch.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";
export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <label className="toggle-switch">
      <input
        onChange={handleToggleSwitchChange}
        type="checkbox"
        className="toggle-switch__checkbox"
      />
      <span className="toggle-switch__slider"></span>
      <span
        stlye={{
          color: `${currentTemperatureUnit === "F" ? "white" : "grey"}`,
        }}
        className={"toggle-switch__text toggle-switch__text_F"}
      >
        F
      </span>
      <span
        stlye={{
          color: `${currentTemperatureUnit === "F" ? "white" : "grey"}`,
        }}
        className={"toggle-switch__text toggle-switch__text_C"}
      >
        C
      </span>
    </label>
  );
}
