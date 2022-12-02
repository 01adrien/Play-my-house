import React from 'react';
import gif from '../assets/page-loader3.gif';

export default function Loader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <img className="w-[10%]" src={gif} alt="loader" />
    </div>
  );
}
