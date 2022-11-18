import React, { useEffect, useEffect } from "react";
import Layout from "../components/Layout";
import { getProfile } from "../api/user";
import { pingServer } from "../api/Axios";

export default function Home({ user, setUser }) {
  useEffect(() => {
    getProfile().then(setUser);
  });

  return (
    <Layout user={user} setUser={user}>
      <div className="mb-auto h-10"></div>
      <div>{JSON.stringify(user)}</div>
    </Layout>
  );
}
