import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { getByFamilyName, getCountByFamilyName } from '../api/instrument';
import InstrumentListPage from '../components/InstrumentListPage';
import { useRecoilValue } from 'recoil';
import { user } from '../store/user';
import usePagination from '../hooks/usePagination';
import withLoading from '../HOC/withLoading';

const InstrumentListPageWithLoading = withLoading(InstrumentListPage);

export default function InstrumentFamily() {
  const { family } = useParams();
  const [typeList, setTypeList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const profile = useRecoilValue(user);
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    itemsNumber,
    data,
    loading,
  } = usePagination(
    getCountByFamilyName,
    getByFamilyName,
    family,
    'INSTRUMENT'
  );

  useEffect(() => {
    getByFamilyName(family, 'TYPE').then(setTypeList);
    getByFamilyName(family, 'BRAND').then(setBrandList);
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
