import { create } from "zustand";
import UserType from "@/app/types/userType";

export interface UserState {
  currentUser: UserType;
  getCurrentUser: () => UserType|null;
  setUser: (user: UserType) => void;
  logout: () => void;
}

const useStore = create<UserState>((set, get) => ({
  currentUser: {
    email: "",
    password: "",
  },

  getCurrentUser: () => {
    const user = get().currentUser;
    if (user.email === '' && user.password === '') {
      return null; 
    }
    return user; 
  },
  
  setUser: (user) =>
    set(() => ({
      currentUser: user,
    })),

  logout: () =>
    set(() => ({
      currentUser: {  email: "", password: "" },
    })),
}));

export default useStore;
