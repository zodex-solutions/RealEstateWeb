// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import ReactDOM from "react-dom/client";
import CommingSoon from "./pages/user/LandingPage/CommingSoon.jsx";
import SplashScreen from "./components/user/splashScreen.jsx";
import AppWrapper from "./components/user/appWrapper.jsx";
import { ToastContainer } from "react-toastify";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>
);
