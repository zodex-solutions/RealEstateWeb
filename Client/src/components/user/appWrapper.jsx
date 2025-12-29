import React, { useState, useEffect } from "react";
import App from "../../App";
import SplashScreen from "./splashScreen";
import { CurrencyProvider } from "../common/currencyContext";
import { ToastContainer } from "react-toastify";

const AppWrapper = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000); // 1 seconds

    return () => clearTimeout(timer);
  }, []);

  return showSplash ? (
    <SplashScreen />
  ) : (
    <CurrencyProvider>
      <App />
      <div className="mt-32">
        <ToastContainer />
      </div>
    </CurrencyProvider>
  );
};

export default AppWrapper;
