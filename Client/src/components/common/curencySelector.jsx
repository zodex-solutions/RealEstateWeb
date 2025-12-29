import React from "react";
import { useCurrency } from "./currencyContext";

const NativeCurrencySelector = () => {
  const { currencyOptions, toCurrency, setToCurrency } = useCurrency();

  return (
    <div className="" style={{ position: "relative" }}>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        className="!bg-white border border-[#A9B9D6] h-[28px] w-full rounded-md py- text-black font-bold px-"
        style={{
          appearance: "none", // Hide native arrow
          WebkitAppearance: "none",
          MozAppearance: "none",
          padding: " 0 10px",
          border: "1px solid #ccc",
          // width: "100px",
          backgroundColor: "#fff",
          cursor: "pointer",
        }}
      >
        {currencyOptions.map(({ code, name, flag }) => (
          <option key={code} value={code}>
            {flag} {code}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NativeCurrencySelector;
