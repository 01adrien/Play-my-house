import { atom, selector } from 'recoil';

export const user = atom({
  key: 'user',
  default: {},
});

export const listToDelete = atom({
  key: 'itemsToDelete',
  default: [],
});
