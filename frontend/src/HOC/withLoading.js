import React from 'react';
import Spinner from '../components/icons/Spinner';

const withLoading =
  (Component) =>
  ({ loading, ...props }) => {
    if (loading) return <Spinner />;
    return <Component {...props} />;
  };

export default withLoading;
