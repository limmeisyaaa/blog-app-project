import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserAuth {
  objectId: string;
  name: string;
  email: string;
  userToken: string;
}

type Store = {
  user: UserAuth | null;
  login: (user: UserAuth) => void;
  logout: () => void;
};

//using persist middleware to save the state in local storage
export const useAuth = create<Store>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user: user }),
      logout: () => set({ user: null }),
    }),
    { name: "auth" },
  ),
);
