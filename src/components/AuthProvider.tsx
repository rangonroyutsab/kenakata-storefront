"use client";

import { createContext, useContext, useEffect, useState } from "react";

import {
  checkEmailAvailability,
  createUser,
  getProfile,
  login as loginRequest,
} from "@/services/products";
import type {
  AuthProfile,
  AuthTokens,
  CreateUserInput,
  LoginInput,
} from "@/types/product";

type AuthContextValue = {
  user: AuthProfile | null;
  tokens: AuthTokens | null;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<void>;
  signup: (input: CreateUserInput) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const TOKEN_STORAGE_KEY = "kenakata-auth-tokens";
const PROFILE_STORAGE_KEY = "kenakata-auth-profile";

function parseStoredJson<T>(value: string | null): T | null {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [tokens, setTokens] = useState<AuthTokens | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return parseStoredJson<AuthTokens>(
      window.localStorage.getItem(TOKEN_STORAGE_KEY)
    );
  });
  const [user, setUser] = useState<AuthProfile | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return parseStoredJson<AuthProfile>(
      window.localStorage.getItem(PROFILE_STORAGE_KEY)
    );
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (tokens) {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
    } else {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  }, [tokens]);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(PROFILE_STORAGE_KEY);
    }
  }, [user]);

  async function refreshProfile() {
    if (!tokens?.access_token) {
      return;
    }

    const profile = await getProfile(tokens.access_token);
    setUser(profile);
  }

  async function login(input: LoginInput) {
    setIsLoading(true);

    try {
      const nextTokens = await loginRequest(input);
      const profile = await getProfile(nextTokens.access_token);
      setTokens(nextTokens);
      setUser(profile);
    } finally {
      setIsLoading(false);
    }
  }

  async function signup(input: CreateUserInput) {
    setIsLoading(true);

    try {
      const availability = await checkEmailAvailability(input.email);

      if (!availability.isAvailable) {
        throw new Error("This email is already registered.");
      }

      await createUser(input);
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    setTokens(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        isLoading,
        login,
        signup,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
