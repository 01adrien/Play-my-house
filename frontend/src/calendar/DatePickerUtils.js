import React, { forwardRef } from 'react';
import { CalendarContainer } from 'react-datepicker';
import BasicButton from '../components/button/BasicButton';

export const DatePickerBtn = forwardRef(({ value, onClick }, ref) => (
  <div className="">
    <BasicButton
      ref={ref}
      onClick={onClick}
      width="52"
      type="button"
      style={'shadow-md hover:scale-105'}
    >
      <p className="">Reservervation</p>
    </BasicButton>
  </div>
));

export const isDispoDay = (day, arr) =>
  arr.includes(day.toString().slice(0, 3).toLocaleLowerCase());

export const currentMonth = () => new Date().getMonth();
export const currentYear = () => new Date().getFullYear();
export const currentDay = () => new Date().getDay();

export const highlightDispoDay = (day, arr) =>
  arr.includes(day.toString().slice(0, 3).toLocaleLowerCase()) &&
  day > new Date()
    ? 'bg-main_color rounded-md text-white'
    : '';

export const DatePickerContainer = ({ children }) => {
  return (
    <div className="h-96 border-2 bg-white rouded-md border-main_color">
      <CalendarContainer className="">
        <div className="">{children}</div>
      </CalendarContainer>
    </div>
  );
};

export const daysTraduction = {
  mon: 'lundi',
  tue: 'mardi',
  wed: 'mercredi',
  thu: 'jeudi',
  fri: 'vendredi',
  sat: 'samedi',
  sun: 'dimanche',
};
