import React from 'react';
import { CalendarContainer } from 'react-datepicker';

export default function DatePickerContainer({ className, children }) {
  return (
    <div className="p-4 bg-main_color">
      <CalendarContainer className="">
        <div className="relative">{children}</div>
      </CalendarContainer>
    </div>
  );
}
