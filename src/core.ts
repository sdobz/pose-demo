/**
 * These types are shared across multiple components and indicate the degree of coupling in this application
 */

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
