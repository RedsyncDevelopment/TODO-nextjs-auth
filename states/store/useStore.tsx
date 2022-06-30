import create from "zustand";
import createLoginModalSlice, { ModalSlice } from "./createLoginModalSlice";

export type MyState = ModalSlice;

const useStore = create<MyState>((set, get) => ({
  ...createLoginModalSlice(set, get),
}));

export default useStore;
