import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  getByTypeName,
  getCountByTypeName,
  searchInstrument,
  getSearchCount,
  getType,
} from '../api/instrument';
import InstrumentListPage from '../components/InstrumentListPage';
import { useRecoilValue, useRecoilState } from 'recoil';
import { user } from '../store/user';
import { categoryFilter } from '../store/search';
import usePagination from '../hooks/usePagination';
import withLoading from '../HOC/withLoading';

const InstrumentListPageWithLoading = withLoading(InstrumentListPage);

export default function InstrumentType() {
  const { type } = useParams();
  const [brandList, setBrandList] = useState([]);
  const [filter, setFilter] = useState(false);
  const [catFilters, setCatFilters] = useRecoilState(categoryFilter);
  const profile = useRecoilValue(user);
  const getData = filter ? searchInstrument : getByTypeName;
  const getCount = filter ? getSearchCount : getCountByTypeName;
  const arg = filter ? catFilters : type;
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    itemsNumber,
    data,
    loading,
  } = usePagination(getCount, getData, arg, 'INSTRUMENT');

  useEffect(() => {
    if (catFilters?.brands?.length) {
      setFilter(true);
      if (!catFilters.page)
        setCatFilters((prev) => ({ ...prev, page: 'TYPE' }));
      searchInstrument(catFilters, null, 0, 10).then(console.log);
    } else {
      if (catFilters.page) setCatFilters((prev) => ({ ...prev, page: '' }));
      setFilter(false);
    }
  }, [catFilters]);

  useEffect(() => {
    setCatFilters({ brands: [], types: [], page: '', id: '' });
    getByTypeName(type, 'BRAND').then(setBrandList);
    getType(type).then(({ id }) =>
      setCatFilters((prev) => ({ ...prev, id: id }))
    );
  }, [type]);
  return (
    <Layout>
      <InstrumentListPageWithLoading
        pageLoader
        loading={loading}
        pagesNumber={Math.ceil(itemsNumber / itemsPerPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        brands={brandList}
        name={type}
        instruments={data}
      />
    </Layout>
  );
}
