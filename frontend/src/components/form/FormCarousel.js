import React, { useState } from 'react';
import { FiArrowRightCircle, FiArrowLeftCircle } from 'react-icons/fi';

export default function FormCarousel({ children }) {
  const [activeForm, setActiveForm] = useState(0);
  const forms = React.Children.toArray(children);
  const currentForm = forms[activeForm];

  const goNext = () => {
    setActiveForm((index) => index + 1);
  };

  const goPrev = () => {
    setActiveForm((index) => index - 1);
  };

  const ButtonPrev = () =>
    activeForm > 0 ? (
      <div className="flex justify-end w-8 items-center h-full">
        <FiArrowLeftCircle
          className="text-2xl cursor-pointer hover:scale-125"
          onClick={goPrev}
        />
      </div>
    ) : (
      <div className="flex justify-start w-8 items-center h-full">
        <FiArrowLeftCircle
          className="text-2xl cursor-pointer hover:scale-125"
          onClick={() => setActiveForm(2)}
        />
      </div>
    );

  const ButtonNext = () =>
    activeForm < forms.length - 1 ? (
      <div className="flex justify-end w-8 items-center h-full">
        <FiArrowRightCircle
          className="text-2xl cursor-pointer hover:scale-125"
          onClick={goNext}
        />
      </div>
    ) : (
      <div className="flex justify-start w-8 items-center h-full">
        <FiArrowRightCircle
          className="text-2xl cursor-pointer hover:scale-125"
          onClick={() => setActiveForm(0)}
        />
      </div>
    );

  return (
    <div className="flex justify-around max-w-[800px] min-w-[300px] w-[50%]">
      <ButtonPrev />
      {currentForm}
      <ButtonNext />
    </div>
  );
}
