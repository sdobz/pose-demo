/**
 * These types are shared across multiple components and indicate the degree of coupling in this application
 */

import { createContext, useContext } from "react";

export interface AuthUser {
  email: string;
}

// This type CANNOT have both a user and an error
// You can reduce bugs by using the type checker to prevent constructing internally inconsistent types
export interface AuthState {
  userInfo?:
    | AuthUser
    | {
        error: string;
      };
  loading: boolean;
}

type AuthFunc = (e: string, p: string) => Promise<void>;

export interface AuthService {
  register: AuthFunc;
  login: AuthFunc;
  logout: () => void;
}

export type Fetcher<T, A extends any[]> = (...args: A) => Promise<T>;
export type ResourceHook<T, A extends any[]> = (...args: A) => Resource<T>;
export interface Resource<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}
export interface SuccessResource<T> extends Resource<T> {
  data: T;
}
export function isSuccess<T>(r: Resource<T>): r is SuccessResource<T> {
  return r.data !== null;
}

export const PENDING_RESOURCE: Resource<any> = {
  data: null,
  error: null,
  loading: false,
};
export const LOADING_RESOURCE: Resource<any> = {
  data: null,
  error: null,
  loading: true,
};

export function makeError(error: string): Resource<any> {
  return {
    data: null,
    error,
    loading: false,
  };
}

export function makeSuccess<T>(data: T): SuccessResource<T> {
  return {
    data,
    error: null,
    loading: false,
  };
}

export interface Exercise {
  title: string;
  id: string;
}
export interface ResourceService {
  useExercises: ResourceHook<Exercise[], []>;
}

// Some nice global state, because yea some state is global
interface AppContext {
  authState: AuthState;
  resourceService: ResourceService;
}

// @ts-ignore - this runtime fails if no AppContext is Provided, this could be stubbed for a better dev experience
export const AppContext = createContext<AppContext>();

export function useAppContext() {
  return useContext(AppContext);
}
