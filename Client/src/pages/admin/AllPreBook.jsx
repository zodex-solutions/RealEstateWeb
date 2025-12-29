import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import config from "../../common/config";

const AllPreBookings = () => {
  const [preBookings, setPreBookings] = useState([]);
  const [propertyData, setPropertyData] = useState({});
  const navigate = useNavigate();

  console.log("preBookings", preBookings);
  useEffect(() => {
    axios
      .get(`${config.API_URL}/api/pre-book`)
      .then((response) => setPreBookings(response.data))
      .catch((error) =>
        console.log("Error fetching pre-bookings: " + error.message)
      );
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      const propertyMap = {};
      await Promise.all(
        preBookings.map(async (booking) => {
          if (!propertyMap[booking.property_id]) {
            try {
              const response = await axios.get(
                `${config.API_URL}/api/property/${booking.property_id}`
              );
              // console.log(response.data.data.title);
              propertyMap[booking.property_id] = response.data.data;
            } catch (error) {
              console.log(
                `Error fetching property ${booking.property_id}: ` +
                  error.message
              );
            }
          }
        })
      );
      setPropertyData(propertyMap);
    };

    if (preBookings.length > 0) {
      fetchProperties();
    }
  }, [preBookings]);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this brochure inquiry?"
    );

    if (!isConfirmed) return;

    try {
      await axios.delete(`${config.API_URL}/api/pre-book/${id}`);
      setPreBookings((prev) => prev.filter((item) => item._id !== id));
      alert("Pre Booking deleted successfully!");
    } catch (error) {
      alert(
        "Error deleting pre-booking: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="p-3 w-full mx-auto">
      <div className="min-h-screen">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Time</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Property Title</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {preBookings.length > 0 ? (
              preBookings.map((booking) => (
                <tr key={booking._id} className="border">
                  <td className="border px-4 py-2 font-bold">{booking.name}</td>
                  <td className="border px-4 py-2">{booking.email}</td>
                  <td className="border px-4 py-2">
                    {booking.country_code} {booking.phone}
                  </td>
                  <td className="border px-4 py-2">{booking.date}</td>
                  <td className="border px-4 py-2">{booking.time}</td>
                  <td className="border px-4 py-2">{booking.message}</td>
                  <td className="border px-4 py-2">
                    {propertyData[booking.property_id]?.title || "Loading..."}
                  </td>
                  <td className="px-4 h-full py-3 justify-center gap-5 font-bold flex">
                    <FaTrash
                      onClick={() => handleDelete(booking._id)}
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No pre-bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPreBookings;
