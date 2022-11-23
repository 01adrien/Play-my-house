import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { getByFamilyName } from "../api/instrument";
import InstrumentListPage from "../components/InstrumentListPage";
import { useRecoilValue } from "recoil";
import { user } from "../store/user";

export default function InstrumentFamily() {
  const { family } = useParams();
  const [typeList, setTypeList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [instrumentList, setInstrumentList] = useState([]);
  const profile = useRecoilValue(user);

  useEffect(() => {
    getByFamilyName(family, "TYPE").then(setTypeList);
    getByFamilyName(family, "BRAND").then(setBrandList);
    getByFamilyName(family, "INSTRUMENT", 0, 10).then(setInstrumentList);
  }, [family]);

  return (
    <Layout>
      <InstrumentListPage
        types={typeList}
        brands={brandList}
        name={family}
        instruments={instrumentList}
      />
      <p>{JSON.stringify(profile)}</p>
    </Layout>
  );
}
