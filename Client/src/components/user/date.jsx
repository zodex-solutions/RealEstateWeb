import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateCompo = ({ dateCss, setDate, date, Calendar }) => {
  const [pickUpDate, setPickUpDate] = useState(new Date());

  // // Load pick-up date from sessionStorage on component mount
  useEffect(() => {
    const storedPickUpDate = sessionStorage.getItem("pickUpDate");
    if (storedPickUpDate) {
      setPickUpDate(new Date(storedPickUpDate)); // Set state from sessionStorage
    }
  }, []);

  // // Update sessionStorage whenever pickUpDate changes
  useEffect(() => {
    if (pickUpDate) {
      sessionStorage.setItem("pickUpDate", pickUpDate.toISOString());
    }
  }, [pickUpDate]);

  useEffect(() => {
    if (pickUpDate) {
      const formattedDate = pickUpDate;
      setDate(formattedDate);
    }
  }, [pickUpDate]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <section>
      <div className="flex  max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Right Section */}
        <div className="w-1/2 p-6">
          <h2 className="text-xl font-bold mb-4">Select a Date & Time</h2>
          <DatePicker
            dateFormat="dd-MM-yyyy  hh:mm a"
            showTimeSelect
            todayButton="Today"
            selected={selectedDate}
            calendarClassName={`${Calendar} custom-calendar z-50`}
            onChange={(date) => setSelectedDate(date)}
            inline
          />
        </div>
      </div>
    </section>
  );
};

export default DateCompo;
{
  /* // <div>
    //   <DatePicker
    //     selected={pickUpDate}
    //     onChange={(date) => setPickUpDate(date)}
    //     dateFormat="dd-MM-yyyy   hh:mm a"
    //     showTimeSelect
    //     placeholderText="Select a date "
    //     className={`${dateCss} custom-date-picke focus:outline-none text-sm !px-0`}
    //     calendarClassName={` ${Calendar} custom-calendar z-50 `}
    //     todayButton="Today"
    //     minDate={new Date()}
    //   />
    // </div> */
}
