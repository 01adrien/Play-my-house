import { useEffect, useState } from 'react';
import { getAllPictureForOne } from '../api/instrument';

export default function useCarousel(id) {
  const [loading, setLoading] = useState(true);
  const [pictures, setPictures] = useState([]);
  useEffect(() => {
    getAllPictureForOne(id)
      .then(setPictures)
      .then(() => setLoading(false));
  }, [id]);

  return { pictures, loading };
}
