import { create } from "zustand";

const useAccountDeletionModal = create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAccountDeletionModal;
