import React from 'react';
import { Carousel } from 'flowbite-react';

export default function Caroussel({ data, Component, slide = false }) {
  return (
    <Carousel slide={slide}>
      {data &&
        data.map((src, i) => (
          <Component key={i} src={src} alt={`picture-${i + 1}`} />
        ))}
    </Carousel>
  );
}
