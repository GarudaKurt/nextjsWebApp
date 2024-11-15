"use client";
import { useState } from "react";
import Layout from "../../_layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import default styles

const RemindMe = () => {
  const [selectDate, setSelectDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("02:00 PM");
  const [selectedReminder, setSelectedReminder] = useState("25 Min");

  const times = ["10:00 AM", "12:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];
  const reminders = ["30 Min", "40 Min", "25 Min", "10 Min", "35 Min"];

  return (
    <Layout>
      <div className="mb-5">
        <label className="flex justify-start text-relaxBlack pt-2 text-lg font-bold font-sans mb-3">
          Appointment
        </label>
        <div className="flex justify-center">
          <DatePicker
            selected={selectDate}
            onChange={(date) => setSelectDate(date)}
            inline
            calendarClassName="custom-calendar"
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
              <div className="flex justify-between items-center px-3 py-2 bg-teal-500 text-white">
                <button onClick={decreaseMonth}>{"<"}</button>
                <span className="text-lg font-semibold">
                  {date.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <button onClick={increaseMonth}>{">"}</button>
              </div>
            )}
          />
        </div>
      </div>

      {/* Available Time Section */}
      <div className="mb-5 text-center">
        <h2 className="text-lg text-relaxBlack font-semibold mb-3">
          Available Time
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {times.map((time) => (
            <div
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`w-16 h-16 flex items-center justify-center rounded-full cursor-pointer ${
                selectedTime === time
                  ? "bg-green-500 text-white"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {time}
            </div>
          ))}
        </div>
      </div>

      {/* Reminder Me Before Section */}
      <div className="mb-5 text-center">
        <h2 className="text-lg text-relaxBlack font-semibold mb-3">
          Reminder Me Before
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {reminders.map((reminder) => (
            <div
              key={reminder}
              onClick={() => setSelectedReminder(reminder)}
              className={`w-16 h-16 flex items-center justify-center rounded-full cursor-pointer ${
                selectedReminder === reminder
                  ? "bg-green-500 text-white"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {reminder}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default RemindMe;
