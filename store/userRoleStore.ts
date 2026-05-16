import { create } from 'zustand';

type RoleStore = {
  isHelper: boolean;
  setIsHelper: (val: boolean) => void;
  toggle: () => void;
};

export const userRoleStore = create<RoleStore>((set) => ({
  isHelper: true,
  setIsHelper: (val) => set({ isHelper: val }),
  toggle: () => set((state) => ({ isHelper: !state.isHelper })),
}));