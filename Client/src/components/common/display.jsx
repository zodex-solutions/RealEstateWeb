import React, { useEffect, useState } from "react";
import { useCurrency } from "./currencyContext";

const PriceDisplay = ({ amount, css }) => {
  const { convertFromAED, toCurrency } = useCurrency();
  console.log("amount", amount);

  const convertedAmount = convertFromAED(amount);

  // const convertedPrice = convertFromAED(2100000); // Convert 100 AED

  const formattedAmount = convertedAmount.toLocaleString();
  return (
    <div className={`${css}`}>
      {toCurrency} {formattedAmount}
    </div>
  );
};

export default PriceDisplay;
