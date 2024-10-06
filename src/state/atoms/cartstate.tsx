import { atom } from "recoil";
import { Product } from "@/src/types";

export const cartState = atom<{ product: Product; quantity: number }[]>({
  key: "cartState",
  default: [],
});
