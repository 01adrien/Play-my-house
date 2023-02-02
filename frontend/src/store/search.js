import { atom, selector } from 'recoil';

export const categoryFilter = atom({
  key: 'categoryFilter',
  default: { brands: [], types: [], page: '', id: '', name: '' },
});
