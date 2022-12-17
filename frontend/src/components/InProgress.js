import React from 'react';
import img from '../assets/in-progress.jpg';

export default function InProgress() {
  return (
    <div className="flex justify-center mt-40">
      <img src={img} alt="in-progress" />
    </div>
  );
}
