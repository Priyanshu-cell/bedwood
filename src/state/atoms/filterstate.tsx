import { atom } from 'recoil';

export const selectedCategoryState = atom<string>({
  key: 'selectedCategoryState',
  default: '', // Default category
});

export const selectedSortOptionState = atom<string>({
  key: 'selectedSortOptionState',
  default: '1', // Default to low to high
});

// New subcategory state
export const selectedSubCategoryState = atom<string>({
  key: 'selectedSubCategoryState',
  default: '', // Default to no subcategory selected
});
