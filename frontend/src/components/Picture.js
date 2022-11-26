import React from "react";

export const Picture = ({ src, alt, style }) => (
  <img className={`${style} object-cover`} src={src} alt={alt} />
);
