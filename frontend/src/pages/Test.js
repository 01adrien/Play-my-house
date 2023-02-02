import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import InstrumentListPage from '../components/InstrumentListPage';
import {
  getAllBrand,
  getAllType,
  getInstruments,
  getInstrumentCount,
  searchInstrument,
  getSearchCount,
} from '../api/instrument';
import withLoading from '../HOC/withLoading';
import usePagination from '../hooks/usePagination';
import useInstrumentsFilter from '../hooks/useInstrumentsFilter';

const InstrumentListPageWithLoading = withLoading(InstrumentListPage);

export default function InstrumentsAll() {
  const [typeList, setTypeList] = useState([]);
  const [brandList, setBrandList] = useState([]);

  const { resetFilters, filter, catFilters } = useInstrumentsFilter('ALL');

  const getData = filter ? searchInstrument : getInstruments;
  const getCount = filter ? getSearchCount : getInstrumentCount;

  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    itemsNumber,
    data,
    loading,
  } = usePagination(getCount, getData, filter && catFilters, filter && null);

  useEffect(() => {
    resetFilters();
    getAllBrand().then(setBrandList);
    getAllType().then(setTypeList);
  }, []);
  return (
    <Layout>
      {/* <div className="w-full h-8 bg-main_color inner-shadow">4</div> */}
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
