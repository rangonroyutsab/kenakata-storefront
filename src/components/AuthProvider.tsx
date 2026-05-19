"use client";

import { createContext, useContext, useEffect, useState } from "react";

import {
  createUser,
  getProfile,
  login as loginRequest,
} from "@/services/products";
import {
  AUTH_COOKIE_MAX_AGE_SECONDS,
  AUTH_COOKIE_NAME,
} from "@/constants/api";
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

function setAuthCookie(accessToken: string) {
  document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(
    accessToken
  )}; path=/; max-age=${AUTH_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
}

function clearAuthCookie() {
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}

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
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [user, setUser] = useState<AuthProfile | null>(null);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedTokens = parseStoredJson<AuthTokens>(
      window.localStorage.getItem(TOKEN_STORAGE_KEY)
    );
    const storedUser = parseStoredJson<AuthProfile>(
      window.localStorage.getItem(PROFILE_STORAGE_KEY)
    );

    queueMicrotask(() => {
      setTokens(storedTokens);
      setUser(storedUser);
      setHasHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (tokens) {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
      setAuthCookie(tokens.access_token);
    } else {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
      clearAuthCookie();
    }
  }, [hasHydrated, tokens]);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (user) {
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(PROFILE_STORAGE_KEY);
    }
  }, [hasHydrated, user]);

  async function refreshProfile() {
    if (!tokens?.access_token) {
      return;
    }

    const profile = await getProfile(tokens.access_token);
    setUser(profile);
  }

  async function authenticate(input: LoginInput) {
    const nextTokens = await loginRequest(input);
    const profile = await getProfile(nextTokens.access_token);
    setAuthCookie(nextTokens.access_token);
    setTokens(nextTokens);
    setUser(profile);
  }

  async function login(input: LoginInput) {
    setIsSubmitting(true);

    try {
      await authenticate(input);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function signup(input: CreateUserInput) {
    setIsSubmitting(true);

    try {
      await createUser(input);
      await authenticate({
        email: input.email,
        password: input.password,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function logout() {
    clearAuthCookie();
    setTokens(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        isLoading: !hasHydrated || isSubmitting,
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
