import React, { useState, useEffect } from "react";

const MortgageCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState(5150000);
  const [deposit, setDeposit] = useState(1030000);
  const [mortgagePeriod, setMortgagePeriod] = useState(25);
  const [interestRate, setInterestRate] = useState(5);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    calculateMonthlyPayment();
  }, [propertyPrice, deposit, mortgagePeriod, interestRate]);

  const calculateMonthlyPayment = () => {
    const loanAmount = propertyPrice - deposit;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = mortgagePeriod * 12;

    if (loanAmount <= 0 || monthlyInterestRate <= 0 || numberOfPayments <= 0) {
      setMonthlyPayment(0);
      return;
    }

    const payment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    setMonthlyPayment(payment);
  };

  return (
    <div className=" text-green-900">
      <h2 className="text-2xl font-bold mb-2">Mortgage Calculator</h2>
      <p className="text-gray-500 mb-6">
        Estimate your monthly mortgage payments
      </p>

      <div className="flex flex-wrap gap-6">
        {/* Property Price */}
        <div>
          <label className="block mb-1 font-semibold">Property Price</label>
          <div className="flex items-center border rounded-md p-2">
            <input
              type="number"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full outline-none"
            />
            <span className="ml-2">AED</span>
          </div>
        </div>

        {/* Deposit */}
        <div>
          <label className="block mb-1 font-semibold">Deposit</label>
          <div className="flex items-center border rounded-md p-2">
            <input
              type="number"
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value))}
              className="w-full outline-none"
            />
            <span className="ml-2">AED</span>
          </div>
        </div>

        {/* Mortgage Period */}
        <div>
          <label className="block mb-1 font-semibold">Mortgage Period</label>
          <div className="flex items-center border rounded-md p-2">
            <input
              type="number"
              value={mortgagePeriod}
              onChange={(e) => setMortgagePeriod(Number(e.target.value))}
              className="w-full outline-none"
            />
            <span className="ml-2">Years</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block mb-1 font-semibold">Interest Rate</label>
          <div className="flex items-center border rounded-md p-2">
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full outline-none"
            />
            <span className="ml-2">%</span>
          </div>
        </div>
      </div>

      {/* Monthly Payment */}
      <div className="mt-8">
        <p className="font-semibold">Monthly Payment</p>
        <p className="text-3xl font-bold mt-2">
          AED
          {monthlyPayment.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </p>
      </div>

      {/* Button */}
      <div className="mt-8">
        <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg">
          Get pre-approved
        </button>
      </div>

      {/* Link */}
      <div className="mt-6">
        <a href="#" className="text-green-900 underline font-semibold">
          View Mortgage Costs and Fees
        </a>
      </div>
    </div>
  );
};

export default MortgageCalculator;
