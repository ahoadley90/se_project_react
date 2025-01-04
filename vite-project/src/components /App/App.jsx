import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [isAddClothesModalOpen, setIsAddClothesModalOpen] = useState(false);

  const handleAddClothes = () => {
    setIsAddClothesModalOpen(true);
  };

  return (
    <div className="app">
      <Header onAddClothes={handleAddClothes} />
      {/* Rest of your app components */}
      {isAddClothesModalOpen && (
        <div className="modal">
          {/* Add your ModalWithForm component here */}
          <button onClick={() => setIsAddClothesModalOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
