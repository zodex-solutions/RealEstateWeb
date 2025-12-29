import { useState } from "react";
import Calendar from "react-calendar";
import TimeSlotSelector from "../../../components/user/timeSlots";

// import "react-calendar/dist/Calendar.css"; // Default Calendar styles
// import "./CalendarCompo.css"; // Custom styles

function CalendarCompo() {
  const [value, setValue] = useState(new Date());

  console.log("value =====", value);

  return (
    <div className="calendar-container flex items-center justify-center w-">
      <Calendar onChange={setValue} value={value} />
      <div className="w-96 h-[400px] overflow-hidden  ">
        <div className="h-full overflow-y-auto p-2">
          <TimeSlotSelector />
        </div>
      </div>
    </div>
  );
}

export default CalendarCompo;
