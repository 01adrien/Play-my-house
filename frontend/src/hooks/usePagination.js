import { useEffect, useState } from 'react';
import { scrollUp } from '../utils';

export default function usePagination(fnCount, fnData, ...args) {
  const [loading, setLoading] = useState(true);
  const [itemsNumber, setItemsNumber] = useState(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const offset = currentPage * itemsPerPage;
  const limit = itemsPerPage;

  useEffect(() => {
    args
      ? fnCount(args[0]).then(setItemsNumber)
      : fnCount().then(setItemsNumber);
  }, []);

  useEffect(() => {
    args
      ? fnData(...args, offset - 12, limit)
          .then(setData)
          .then(() => {
            setLoading(false);
            setTimeout(() => {
              scrollUp();
            }, 200);
          })
          .then()
      : fnData(offset - 12, limit)
          .then(setData)
          .then(() => {
            setLoading(false);
            setTimeout(() => {
              scrollUp();
            }, 200);
          });
  }, [currentPage, args[0]]);

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    itemsNumber,
    data,
    loading,
  };
}
