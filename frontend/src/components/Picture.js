import React from 'react';

export const Picture = ({
  src,
  alt,
  style = 'rounded-md w-full h-full shadow-md',
}) => {
  return <img className={style} src={src} alt={alt} />;
};
