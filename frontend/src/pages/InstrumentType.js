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
import usePagination from '../hooks/usePagination';
import withLoading from '../HOC/withLoading';
import useInstrumentsFilter from '../hooks/useInstrumentsFilter';

const InstrumentListPageWithLoading = withLoading(InstrumentListPage);

export default function InstrumentType() {
  const { type } = useParams();
  const [brandList, setBrandList] = useState([]);

  const { resetFilters, filter, catFilters, setCatFilters } =
    useInstrumentsFilter('TYPE');

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
    resetFilters();
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
        page="TYPE"
      />
    </Layout>
  );
}
