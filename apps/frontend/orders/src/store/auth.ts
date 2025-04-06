import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import { userInterface } from "@repo/common/config";
// import { immer } from "zustand/middleware/immer";
// import { persist } from "zustand/middleware";

export interface userStoreInterface extends userInterface {
    iat: number;
}
interface UserStore {
    user: userStoreInterface | null;
    setUser: (user: userStoreInterface | null) => void;
    clearUser: () => void;
}
const fallbackStorage: StateStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
};
export const useAuthStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: "auth-storage", // Key for local storage
            storage: createJSONStorage(() =>
                typeof window !== "undefined" ? localStorage : fallbackStorage
            ),
        }
    )
);
