import React, { forwardRef } from 'react';
import { CalendarContainer } from 'react-datepicker';
import BasicButton from '../components/button/BasicButton';

export const DatePickerBtn = forwardRef(({ value, onClick }, ref) => (
  <div className="flex w-full justify-center">
    <BasicButton
      ref={ref}
      onClick={onClick}
      width="60"
      type="button"
      style={
        'self-center relative bottom-0 shadow-md hover:scale-105 flex justify-center items-center'
      }
    >
      <p className="">Reserver !</p>
    </BasicButton>
  </div>
));

export const DatePickerContainer = ({ children }) => {
  return (
    <div className="h-96 border-2 bg-white rouded-md border-main_color">
      <CalendarContainer className="">
        <div className="">{children}</div>
      </CalendarContainer>
    </div>
  );
};
