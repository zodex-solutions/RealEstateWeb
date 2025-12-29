// import { useState } from "react";

// const generateTimeSlots = (
//   start = "12:00 AM",
//   end = "11:30 PM",
//   interval = 30
// ) => {
//   const slots = [];
//   let hours = 12;
//   let minutes = 0;
//   let isPM = false;

//   while (!(hours === 11 && minutes === 30 && isPM)) {
//     const formattedTime = `${String(hours).padStart(2, "0")}:${String(
//       minutes
//     ).padStart(2, "0")} ${isPM ? "PM" : "AM"}`;
//     slots.push(formattedTime);

//     minutes += interval;
//     if (minutes >= 60) {
//       minutes = 0;
//       hours += 1;
//     }
//     if (hours > 12) {
//       hours = 1;
//     }
//     if (hours === 12 && minutes === 0) {
//       isPM = !isPM;
//     }
//   }
//   slots.push("11:30 PM"); // Ensure the last slot is included
//   return slots;
// };

// function TimeSlotSelector({ setSelectedSlot, selectedSlot }) {
//   const timeSlots = generateTimeSlots("12:00 AM", "11:30 PM", 30);
//   console.log("first ========", selectedSlot);
//   return (
//     <div className="flex flex-col items-center overflow-scroll  ">
//       <div className="flex flex-col gap-3 w-full">
//         {timeSlots.map((slot) => (
//           <div
//             key={slot}
//             className={`w-full flex items-center justify-center py-3 border hover:scale-[102%] border-gray-300 text-lg font-medium rounded-md transition cursor-pointer ${
//               selectedSlot === slot
//                 ? "bg-[#2f5fa7] text-white border-[#2f5fa7]"
//                 : "bg-white text-black hover:bg-gray-200"
//             }`}
//             onClick={() => setSelectedSlot(slot)}
//           >
//             {slot}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TimeSlotSelector;

import { useState } from "react";

const generateTimeSlots = (
  start = "12:00 AM",
  end = "11:30 PM",
  interval = 30
) => {
  const slots = [];
  let hours = 12;
  let minutes = 0;
  let isPM = false;

  while (!(hours === 11 && minutes === 30 && isPM)) {
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")} ${isPM ? "PM" : "AM"}`;
    slots.push(formattedTime);

    minutes += interval;
    if (minutes >= 60) {
      minutes = 0;
      hours += 1;
    }
    if (hours > 12) {
      hours = 1;
    }
    if (hours === 12 && minutes === 0) {
      isPM = !isPM;
    }
  }
  slots.push("11:30 PM"); // Ensure the last slot is included
  return slots;
};

// Converts "03:30 PM" to a Date object of today
const parseTimeToTodayDate = (timeStr) => {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const now = new Date();
  const date = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0
  );
  return date;
};

function TimeSlotSelector({ setSelectedSlot, selectedSlot }) {
  const timeSlots = generateTimeSlots("12:00 AM", "11:30 PM", 30);
  const now = new Date();

  return (
    <div className="flex flex-col items-center overflow-scroll">
      <div className="flex flex-col gap-3 w-full">
        {timeSlots.map((slot) => {
          const slotTime = parseTimeToTodayDate(slot);
          const isPast = slotTime < now;

          return (
            <div
              key={slot}
              className={`w-full flex items-center justify-center py-3 border text-lg font-medium rounded-md transition cursor-pointer
                ${
                  isPast
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed border-gray-200"
                    : selectedSlot === slot
                    ? "bg-[#2f5fa7] text-white border-[#2f5fa7]"
                    : "bg-white text-black hover:bg-gray-200 hover:scale-[102%]"
                }
              `}
              onClick={() => {
                if (!isPast) setSelectedSlot(slot);
              }}
            >
              {slot}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TimeSlotSelector;
