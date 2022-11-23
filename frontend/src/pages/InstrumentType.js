import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { getByTypeName } from "../api/instrument";
import InstrumentListPage from "../components/InstrumentListPage";
import { useRecoilValue } from "recoil";
import { user } from "../store/user";

export default function InstrumentType() {
  const { type } = useParams();
  const [brandList, setBrandList] = useState([]);
  const [instrumentList, setInstrumentList] = useState([]);
  const profile = useRecoilValue(user);
  useEffect(() => {
    getByTypeName(type, "BRAND").then(setBrandList);
    getByTypeName(type, "INSTRUMENT", 0, 10).then(setInstrumentList);
  }, [type]);
  return (
    <Layout>
      <InstrumentListPage
        brands={brandList}
        name={type}
        instruments={instrumentList}
      />
      <p>{JSON.stringify(profile)}</p>
    </Layout>
  );
}
