//state/atoms/filterState.ts
import { atom } from 'recoil';

export const refetchProductData = atom<boolean>({
  key: 'refetchProductData',
  default: false, // Default category
});


