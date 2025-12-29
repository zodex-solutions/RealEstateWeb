import React, { useEffect } from "react";
import { useCurrency } from "../../../components/common/currencyContext";

const CurrencyConverter = () => {
  const {
    amount,
    setAmount,
    toCurrency,
    setToCurrency,
    convertedAmount,
    currencyOptions,
  } = useCurrency();

  // Trigger the conversion when `amount` or `toCurrency` changes
  useEffect(() => {
    if (amount && toCurrency) {
      fetch(
        `https://v6.exchangerate-api.com/v6/98b38dacb2a0f0f2eb22818d/latest/AED`
      )
        .then((res) => res.json())
        .then((data) => {
          // Calculate converted amount based on selected currency and amount
          setConvertedAmount(data.conversion_rates[toCurrency] * amount);
        })
        .catch((err) => console.error("Conversion error:", err));
    }
  }, [amount, toCurrency]); // Dependency on both `amount` and `toCurrency`

  return (
    <div style={{ padding: 20 }}>
      {/* <h2>Currency Converter</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: 8, marginBottom: 10 }}
      />
      <br />

      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        style={{ padding: 8 }}
      >
        {currencyOptions.map(({ code, name }) => (
          <option key={code} value={code}>
            {code} - {name}
          </option>
        ))}
      </select>

      <br />
      {convertedAmount !== null && (
        <div style={{ marginTop: 20 }}>
          <strong>
            {amount} AED = {convertedAmount.toFixed(2)} {toCurrency}
          </strong>
        </div>
      )} */}
    </div>
  );
};

export default CurrencyConverter;
