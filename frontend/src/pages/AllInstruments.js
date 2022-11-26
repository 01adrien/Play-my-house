import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import InstrumentListPage from "../components/InstrumentListPage";
import { getAllBrand, getAllType, getInstruments } from "../api/instrument";

export default function AllInstruments() {
  const [typeList, setTypeList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  // const [familyList, setFamilyList] = useState([]);
  const [instrumentList, setInstrumentList] = useState([]);

  useEffect(() => {
    getAllBrand().then(setBrandList);
    getAllType().then(setTypeList);
    // getInstruments(0, 10).then(setInstrumentList);
  }, []);

  return (
    <Layout>
      <InstrumentListPage
        types={typeList}
        brands={brandList}
        name={"Tous les instruments"}
        instruments={instrumentList}
      />
    </Layout>
  );
}
