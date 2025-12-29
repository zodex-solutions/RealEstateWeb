import React, { useState } from "react";

const PropertyROICalculator = ({ price }) => {
  console.log("price", price.toString().replace(/,/g, ""));
  const [propertyPrice, setPropertyPrice] = useState(
    price.toString().replace(/,/g, "")
  );
  const [annualServiceCharges, setAnnualServiceCharges] = useState(0);
  const [additionalCharges, setAdditionalCharges] = useState(0);
  const [annualRentalPrice, setAnnualRentalPrice] = useState(
    (propertyPrice * 0.15).toFixed(2).toString().replace(/,/g, "")
  );

  const netRent =
    annualRentalPrice - (annualServiceCharges + additionalCharges);
  const netROI = propertyPrice
    ? ((netRent / propertyPrice) * 100).toFixed(2)
    : 0;

  return (
    <div className=" text-black">
      <h2 className="text-2xl font-bold mb-2">Rental Yield Calculator</h2>
      <p className="text-gray-500 mb-6">
        Calculate the gross and net rental yields on a property.
      </p>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex flex-col max-w-[190px">
          <label className="block mb-1 font-semibold">Property Price</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <input
              type="number"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full outline-none bg-transparent"
            />
            <span className="ml-2">AED</span>
          </div>
        </div>

        {/* <div className="flex flex-col max-w-[190px]">
          <label className="block mb-1 font-semibold">
            Annual services charges
          </label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <input
              type="number"
              value={annualServiceCharges}
              onChange={(e) => setAnnualServiceCharges(Number(e.target.value))}
              className="w-full outline-none bg-transparent"
            />
            <span className="ml-2">AED</span>
          </div>
        </div>

        <div className="flex flex-col max-w-[190px]">
          <label className="bloc mb-1 font-semibold">Additional charges</label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <input
              type="number"
              value={additionalCharges}
              onChange={(e) => setAdditionalCharges(Number(e.target.value))}
              className="w-full outline-none bg-transparent"
            />
            <span className="ml-2">AED</span>
          </div>
        </div> */}

        <div className="flex flex-col">
          <label className="block mb-1 font-semibold">
            Annual rental price
          </label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <input
              type="number"
              value={annualRentalPrice}
              onChange={(e) => setAnnualRentalPrice(Number(e.target.value))}
              className="w-full outline-none"
            />
            <span className="ml-2">AED</span>
          </div>
        </div>

        <div className="mt- flex flex-wrap gap-6">
          <div>
            <p className="font-semibold">Net Rent</p>
            <p className="text-2xl font-bold mt-2">
              AED {netRent.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="font-semibold">NET ROI</p>
            <p className="text-2xl font-bold mt-2">{netROI}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyROICalculator;
