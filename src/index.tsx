import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./components/app/App";
import NotFound from "./components/error/notFound";
import Header from "./components/header/header";
import PokemonAll from "./components/pokemon/pokemon.all";
import PokemonDetail from "./components/pokemon/pokemon.detail";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pokemons" element={<PokemonAll />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
