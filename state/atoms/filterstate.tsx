//state/atoms/filterState.ts
import { atom } from 'recoil';

export const selectedCategoryState = atom<string>({
  key: 'selectedCategoryState',
  default: 'All', // Default category
});

export const selectedSortOptionState = atom<string>({
  key: 'selectedSortOptionState',
  default: '1', // Default to low to high
});
