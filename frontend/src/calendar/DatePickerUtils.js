import React, { forwardRef } from 'react';
import BasicButton from '../components/button/BasicButton';

export const DatePickerBtn = React.forwardRef(({ value, onClick }, ref) => (
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

export const isDispoDay = (day, arr1, arr2, selectedMonth) => {
  const formatDay2 = day.toLocaleDateString().replace(/-/g, '/');
  const formatDay1 = day.toString().slice(0, 3).toLocaleLowerCase();
  return (
    arr1.includes(formatDay1) &&
    !arr2.includes(formatDay2) &&
    day.getMonth() + 1 === selectedMonth
  );
};

export const currentMonth = () => new Date().getMonth();
export const currentYear = () => new Date().getFullYear();
export const currentDay = () => new Date().getDay();

export const highlightDispoDay = (
  day,
  arr1,
  arr2,
  arr3,
  selectedMonth,
  selectedYear
) => {
  const formatDay1 = day.toString().slice(0, 3).toLocaleLowerCase();
  const formatDay2 = day.toLocaleDateString().replace(/-/g, '/');
  return !arr2.includes(formatDay2) &&
    arr3.includes(formatDay1) &&
    day > new Date() &&
    !arr1.includes(formatDay2) &&
    day.getMonth() + 1 === selectedMonth &&
    day.getFullYear() === selectedYear
    ? 'bg-main_color shadow-md rounded-md text-white hover:text-black'
    : arr1.includes(formatDay2)
    ? 'bg-[#ffc4ab] shadow-md from-main_color to-slate-300 hover:text-black hover:bg-slate-200 rounded-md text-white'
    : '';
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

export const DateNumToStr = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
  7: 'sunday',
};
