import React from "react";
import DatePick from "react-date-picker";

const DatePicker = (chosenDate, setDate) => {
  return (
    <DatePick
      format='dd/MM/yyyy'
      dayPlaceholder='DD'
      monthPlaceholder='MM'
      yearPlaceholder='YYYY'
      showLeadingZeros={true}
      calendarIcon={null}
      onChange={setDate}
      value={chosenDate}
    />
  );
};

export default DatePicker;
