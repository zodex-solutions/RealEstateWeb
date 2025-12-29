import React, { useState } from "react";
import DateCompo from "../../../components/user/date";

export const Date = () => {
  const [date, setDate] = useState(null);

  return (
    <div className=" !w-full h-screen bg-red-30 mt-10">
      <label className="lg:text-lg md:text-lg sm:text-[16px] text-md">
        Pick Up
      </label>
      <div className="BorderBottom w-full">
        <DateCompo
          Calendar={`CalenderPosition left-[101px] absolut `}
          date={date}
          setDate={setDate}
          dateCss={" "}
        />
      </div>
    </div>
  );
};
