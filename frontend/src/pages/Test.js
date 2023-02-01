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
import { useRecoilState } from 'recoil';
import { categoryFilter } from '../store/search';
import BasicButton from '../components/button/BasicButton';
import { getInstrumentPaginate } from '../api/instrument';

const InstrumentListPageWithLoading = withLoading(InstrumentListPage);

export default function InstrumentsAll() {
  const [typeList, setTypeList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [filter, setFilter] = useState(false);
  const [catFilters, setCatFilters] = useRecoilState(categoryFilter);
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
    if (catFilters?.brands?.length || catFilters?.types?.length) {
      setFilter(true);
      if (!catFilters.page) setCatFilters((prev) => ({ ...prev, page: 'ALL' }));
    } else {
      if (catFilters.page) setCatFilters((prev) => ({ ...prev, page: '' }));
      setFilter(false);
    }
  }, [catFilters]);

  useEffect(() => {
    setCatFilters({ brands: [], types: [], page: '', id: '' });
    getAllBrand().then(setBrandList);
    getAllType().then(setTypeList);
  }, []);
  return (
    <Layout>
      <BasicButton onClick={getInstrumentPaginate}>click me</BasicButton>
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
