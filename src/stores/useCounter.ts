import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  count: number;
  inc: () => void;
  dec: () => void;
};

//// WITHOUT PERSIST
// export const useCounter = create<Store>()((set) => ({
//   count: 1,
//   inc: () => set((state) => ({ count: state.count + 1 })),
//   dec: () => set((state) => ({ count: state.count - 1 }))
// }))


//using persist middleware to save the state in local storage
export const useCounter = create<Store>()(
  persist(
    (set) => ({
      count: 1,
      inc: () => set((state) => ({ count: state.count + 1 })),
      dec: () => set((state) => ({ count: state.count - 1 })),
    }),
    { name: "counter" },
  ),
);
