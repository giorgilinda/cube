import { create } from 'zustand';

interface AppState {
  isMenuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

// This store is ready but won't do anything until you call it in a component
export const useAppStore = create<AppState>((set) => ({
  isMenuOpen: false,
  setMenuOpen: (open) => set({ isMenuOpen: open }),
}));