import React from "react";
import Spinner from "../components/icons/Spinner";

export default withLoading =
  (Component) =>
  ({ loading, ...props }) => {
    if (loading) return <Spinner />;
    return <Component {...props} />;
  };
