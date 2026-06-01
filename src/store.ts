import { create } from 'zustand';

interface ModalStore {
  isBookingOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isBookingOpen: false,
  openBooking: () => set({ isBookingOpen: true }),
  closeBooking: () => set({ isBookingOpen: false }),
}));
