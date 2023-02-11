import { useEffect, useState } from 'react';

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
    args && args[0]
      ? fnCount(args[0]).then((data) => {
          if (typeof data === 'object') {
            setItemsNumber(Object.values(data)[0]);
          } else {
            setItemsNumber(data);
          }
        })
      : fnCount().then(setItemsNumber);
  }, [fnCount]);

  useEffect(() => {
    args && args[0]
      ? fnData(...args, offset - itemsPerPage, limit)
          .then(setData)
          .then(() => setLoading(false))
      : fnData(offset - itemsPerPage, limit)
          .then(setData)
          .then(() => setLoading(false));
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




