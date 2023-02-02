import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { categoryFilter } from '../store/search';
import { searchInstrument } from '../api/instrument';

export default function useInstrumentsFilter(page) {
  const [filter, setFilter] = useState(false);
  const [catFilters, setCatFilters] = useRecoilState(categoryFilter);

  function resetFilters() {
    setCatFilters({ brands: [], types: [], page: '', id: '', name: '' });
  }

  useEffect(() => {
    // console.log(catFilters);
    //searchInstrument(catFilters, null, 0, 10).then(console.log);
    if (
      catFilters?.brands?.length ||
      catFilters?.types?.length ||
      catFilters?.name?.length
    ) {
      !filter && setFilter(true);
      if (!catFilters.page) setCatFilters((prev) => ({ ...prev, page: page }));
    } else {
      if (catFilters.page) setCatFilters((prev) => ({ ...prev, page: '' }));
      setFilter(false);
    }
  }, [catFilters]);

  return {
    setFilter,
    filter,
    catFilters,
    setCatFilters,
    resetFilters,
  };
}
