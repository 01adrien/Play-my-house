import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useRecoilValue } from "recoil";
import { user } from "../store/user";

export default function Instrument() {
  const { id } = useParams();
  const profile = useRecoilValue(user);
  return (
    <Layout>
      <div className="text-center pt-20 text-3xl">instrument ID {id}</div>
      <p>{JSON.stringify(profile)}</p>
    </Layout>
  );
}
