import React from "react";
import { Navbar } from "./components";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";

import "./style.css";
import HomePage from "./pages/HomePage";
import CryptoPage from "./pages/CryptoPage";
import CryptoDetail from "./pages/CryptoDetail";
import ExchangePage from "./pages/ExchangePage";
import NewsPage from "./pages/NewsPage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="app">
      <CssBaseline />
      <Navbar />

      <div className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cryptocurrencies" element={<CryptoPage />} />
          <Route
            path="/cryptocurrencies/:cryptoId"
            element={<CryptoDetail />}
          />
          <Route path="/exchanges" element={<ExchangePage />} />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
