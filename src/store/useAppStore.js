import { create } from 'zustand';

export const useAppStore = create((set) => ({
  // Example state
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  // Add your global state here
}));
