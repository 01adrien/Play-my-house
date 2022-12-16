import { useEffect, useState } from 'react';
import { getAllFamily, getAllBrand, getAllType } from '../api/instrument';
import { makeErrorToast } from '../utils';

export default function useAddInstrument() {
  const [families, setFamilies] = useState([]);
  const [types, setTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pictures, setPictures] = useState([]);
  const [instrumentInfo, setInstrumentInfo] = useState({
    type: '',
    family: '',
    brand: '',
    description: '',
    name: '',
  });

  function getFilteredTypeList() {
    return instrumentInfo.family && instrumentInfo.family !== ''
      ? types.filter((t) => t['family_id'] == instrumentInfo.family)
      : types;
  }

  function handleFilesSelect(e) {
    pictures.length === 5
      ? makeErrorToast({}, 'Pas plus de 5 photos par instrument')
      : setPictures((prev) => [...prev, e.target.files[0]]);
  }

  function handleDeleteFile(fileName) {
    setPictures((prev) => prev.filter((file) => file.name !== fileName));
  }

  useEffect(() => {
    getAllFamily().then(setFamilies);
    getAllBrand().then(setBrands);
    getAllType().then(setTypes);
    setLoading(false);
  }, []);

  return {
    loading,
    families,
    getFilteredTypeList,
    brands,
    loading,
    handleFilesSelect,
    handleDeleteFile,
    pictures,
    setPictures,
    instrumentInfo,
    setInstrumentInfo,
  };
}
