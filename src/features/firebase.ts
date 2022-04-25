// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import { useMemo, useState } from "react";

import {
  AuthService,
  AuthState,
  ResourceService,
  ResourceState,
  Exercise,
  LOADING_RESOURCE,
  makeSuccess,
  PENDING_RESOURCE,
  makeError,
} from "../core";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// GOAL:
// do not import firebase anywhere but here, that is an implementation detail

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDJKQPhRFwS31ejNFTtWWS7r2QYtEWLAJo",
  authDomain: "pose-demo-5f5fc.firebaseapp.com",
  projectId: "pose-demo-5f5fc",
  storageBucket: "pose-demo-5f5fc.appspot.com",
  messagingSenderId: "609325593011",
  appId: "1:609325593011:web:8b29bb7b1a52d6408bdbc6",
};

type CreateOrRegister =
  | typeof createUserWithEmailAndPassword
  | typeof signInWithEmailAndPassword;

export function useFirebase() {
  const app = useMemo(() => initializeApp(firebaseConfig), [firebaseConfig]);
  /**
   * ====
   * AUTH
   * ====
   */
  const [authState, setAuthState] = useState<AuthState>({ loading: false });
  function updateAuthState(part: Partial<AuthState>) {
    setAuthState((prev) => ({
      ...prev,
      ...part,
    }));
  }

  const authService = useMemo(() => {
    const auth = getAuth(app);

    // Couldn't help myself with some good ole functional programming
    // This takes a function from firebase to create OR register a user, and returns a function that accepts email and password and manages state
    // I'd have to think hard if I'd write this in "production" code, it's terse AF but many people are turned off by higher order functions
    const handleAuth =
      (performAuth: CreateOrRegister) => (email: string, password: string) => {
        updateAuthState({ loading: true });

        console.log("[firebase-auth/core] Attempting auth for", email);
        return performAuth(auth, email, password)
          .then((userCredentials) => {
            console.log("[firebase-auth/core] Authed with", userCredentials);

            // const user = userCredential.user;
            updateAuthState({
              userInfo: {
                email,
              },
            });
          })
          .catch((error) => {
            console.warn("[firebase-auth/core] Auth error:", error);
            // const errorCode = error.code;
            const errorMessage = error.message;

            updateAuthState({
              userInfo: {
                error: errorMessage,
              },
            });
          })
          .finally(() => updateAuthState({ loading: false }));
      };
    function logout() {
      updateAuthState({ userInfo: undefined });
    }

    return {
      register: handleAuth(createUserWithEmailAndPassword),
      login: handleAuth(signInWithEmailAndPassword),
      logout,
    } as AuthService;
  }, [app, setAuthState]);

  /**
   * ========
   * Resource
   * ========
   */

  const [resourceState, setResourceState] = useState<ResourceState>({
    exercises: PENDING_RESOURCE,
  });
  function updateResourceState(part: Partial<ResourceState>) {
    setResourceState((prev) => ({
      ...prev,
      ...part,
    }));
  }

  const resourceService = useMemo(() => {
    const db = getFirestore(app);

    function loadExercises() {
      if (resourceState.exercises.loading || resourceState.exercises.data) {
        return;
      }

      updateResourceState({ exercises: LOADING_RESOURCE });
      getDocs(collection(db, "exercise"))
        .then((querySnapshot) => {
          const exercises = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            console.log(
              `[firebase] exercise: ${doc.id} => ${JSON.stringify(data)}`
            );
            return {
              id: doc.id,
              title: data.title,
            };
          });
          updateResourceState({ exercises: makeSuccess(exercises) });
        })
        .catch((error) => {
          console.warn("[firebase] exercise error:", error);
          updateResourceState({
            exercises: makeError(error.message),
          });
        });
    }

    return { loadExercises } as ResourceService;
  }, [app, setResourceState]);

  return { authState, authService, resourceState, resourceService };
}
