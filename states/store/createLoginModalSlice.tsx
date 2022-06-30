import { GetState, SetState } from "zustand";
import { MyState } from "./useStore";

export interface ModalSlice {
  showModal: boolean;
  setShowModal: (modal: boolean) => void;
}

const createLoginModalSlice = (
  set: SetState<MyState>,
  get: GetState<MyState>
) => ({
  showModal: false,
  setShowModal: (modal: boolean) => {
    set({
      showModal: modal,
    });
  },
});

export default createLoginModalSlice;
