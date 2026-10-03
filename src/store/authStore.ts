import { create } from "zustand";

interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;

  setAccessToken: (token: string) => void;
  setUser: (user: AuthUser) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken"),

  user: JSON.parse(
    localStorage.getItem("user") || "null"
  ),

//!!boolean
  isAuthenticated: !!localStorage.getItem("accessToken"),

  //وقتی کاربر Login موفق انجام می‌دهد
  setAccessToken: (token) => {
    localStorage.setItem("accessToken", token);

    set({
      accessToken: token,
      isAuthenticated: true,
    });
  },

  setUser: (user) => {
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    set({
      user,
    });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));

export default useAuthStore;