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
import usePagination from '../hooks/usePagination';
import withLoading from '../HOC/withLoading';
import useInstrumentsFilter from '../hooks/useInstrumentsFilter';

const InstrumentListPageWithLoading = withLoading(InstrumentListPage);

export default function InstrumentFamily() {
  const { family } = useParams();
  const [typeList, setTypeList] = useState([]);
  const [brandList, setBrandList] = useState([]);

  const { resetFilters, filter, catFilters, setCatFilters } =
    useInstrumentsFilter('FAMILY');

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
    resetFilters();
    getByFamilyName(family, 'TYPE').then(setTypeList);
    getByFamilyName(family, 'BRAND').then(setBrandList);
    getFamily(family).then(({ id }) => {
      setCatFilters((prev) => ({ ...prev, id: id }));
    });
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
        page="FAMILY"
      />
    </Layout>
  );
}
