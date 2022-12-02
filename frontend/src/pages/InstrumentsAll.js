import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import InstrumentListPage from '../components/InstrumentListPage';
import {
  getAllBrand,
  getAllType,
  getInstruments,
  getInstrumentCount,
} from '../api/instrument';
import withLoading from '../HOC/withLoading';
import usePagination from '../hooks/usePagination';

const InstrumentListPageWithLoading = withLoading(InstrumentListPage);

export default function InstrumentsAll() {
  const [typeList, setTypeList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    itemsNumber,
    data,
    loading,
  } = usePagination(getInstrumentCount, getInstruments);

  useEffect(() => {
    getAllBrand().then(setBrandList);
    getAllType().then(setTypeList);
  }, []);
  return (
    <Layout>
      <InstrumentListPageWithLoading
        loading={loading}
        pagesNumber={Math.ceil(itemsNumber / itemsPerPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        types={typeList}
        brands={brandList}
        name={'Tous les instruments'}
        instruments={data}
      />
    </Layout>
  );
}
