import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { getByTypeName, getCountByTypeName } from '../api/instrument';
import InstrumentListPage from '../components/InstrumentListPage';
import { useRecoilValue } from 'recoil';
import { user } from '../store/user';
import usePagination from '../hooks/usePagination';
import withLoading from '../HOC/withLoading';

const InstrumentListPageWithLoading = withLoading(InstrumentListPage);

export default function InstrumentType() {
  const { type } = useParams();
  const [brandList, setBrandList] = useState([]);
  const profile = useRecoilValue(user);
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    itemsNumber,
    data,
    loading,
  } = usePagination(getCountByTypeName, getByTypeName, type, 'INSTRUMENT');

  useEffect(() => {
    getByTypeName(type, 'BRAND').then(setBrandList);
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
