import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  getByFamilyName,
  getCountByFamilyName,
  searchInstrument,
  getSearchCount,
  getFamily,
} from '../api/instrument';
import InstrumentListPage from '../components/InstrumentListPage';
import { useRecoilValue, useRecoilState } from 'recoil';
import { user } from '../store/user';
import { categoryFilter } from '../store/search';
import usePagination from '../hooks/usePagination';
import withLoading from '../HOC/withLoading';

const InstrumentListPageWithLoading = withLoading(InstrumentListPage);

export default function InstrumentFamily() {
  const { family } = useParams();
  const [typeList, setTypeList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const profile = useRecoilValue(user);
  const [filter, setFilter] = useState(false);
  const [catFilters, setCatFilters] = useRecoilState(categoryFilter);
  const getData = filter ? searchInstrument : getByFamilyName;
  const getCount = filter ? getSearchCount : getCountByFamilyName;
  const arg = filter ? catFilters : family;

  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    itemsNumber,
    data,
    loading,
  } = usePagination(getCount, getData, arg, 'INSTRUMENT');

  useEffect(() => {
    if (catFilters?.brands?.length || catFilters?.types?.length) {
      setFilter(true);
      if (!catFilters.page)
        setCatFilters((prev) => ({ ...prev, page: 'FAMILY' }));
    } else {
      if (catFilters.page) setCatFilters((prev) => ({ ...prev, page: '' }));
      setFilter(false);
    }
  }, [catFilters]);

  useEffect(() => {
    setCatFilters({ brands: [], types: [], page: '', id: '' });
    getByFamilyName(family, 'TYPE').then(setTypeList);
    getByFamilyName(family, 'BRAND').then(setBrandList);
    getFamily(family).then(({ id }) =>
      setCatFilters((prev) => ({ ...prev, id: id }))
    );
  }, [family]);

  return (
    <Layout>
      <InstrumentListPageWithLoading
        pageLoader
        loading={loading}
        pagesNumber={Math.ceil(itemsNumber / itemsPerPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        types={typeList}
        brands={brandList}
        name={family}
        instruments={data}
      />
    </Layout>
  );
}
