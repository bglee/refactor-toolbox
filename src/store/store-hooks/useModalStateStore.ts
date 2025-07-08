import { useStore } from "@tanstack/react-store";
import { modalStore } from "../store";
import { ModalState } from "../../model/ModalState";

const useModalStateStore = () => {
  return {
    modalState: useStore(modalStore, (state) => state),
    setModalState: (modal: ModalState | null) => modalStore.setState(() => modal),
  };
};

export default useModalStateStore;
