import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GameFramework from "./pages/GameFramework";
import background from "./img/quizbackground.png";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const setBackground = () => {
  const element = document.getElementById("root");
  element.style.boxSizing = "border-box";
  element.style.backgroundImage = `url(${background})`;
  element.style.margin = "0";
  element.style.backgroundSize = "cover";
  element.style.height = "100vh";
};

setBackground();

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameFramework />} />
      </Routes>
    </BrowserRouter>
  );
}
