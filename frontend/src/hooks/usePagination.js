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
    setCurrentPage(1);
    args
      ? fnCount(args[0]).then(setItemsNumber)
      : fnCount().then(setItemsNumber);
  }, [fnCount]);

  useEffect(() => {
    args
      ? fnData(...args, offset - itemsPerPage, limit)
          .then(setData)
          .then(() => {
            setLoading(false);
            setTimeout(() => {
              scrollUp();
            }, 200);
          })
          .then()
      : fnData(offset - itemsPerPage, limit)
          .then(setData)
          .then(() => {
            setLoading(false);
            setTimeout(() => {
              scrollUp();
            }, 200);
          });
  }, [currentPage, ...args, fnData, itemsNumber]);

  return {
    currentPage,
    setCurrentPage,
    setItemsNumber,
    itemsPerPage,
    itemsNumber,
    data,
    loading,
  };
}
