import React, { useContext, useEffect, useState } from 'react';
import { auth, provider } from '../firebase-config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (username, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(() => {
      updateProfile(auth.currentUser, {
        displayName: username,
      })
        .then(() => {
          // Profile updated!
          // ...
        })
        .catch((error) => {
          // An error occurred
          // ...
        });
    });
  };

  const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGmail = () => {
    return signInWithPopup(auth, provider);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    //This method listens for changes in the user's authentication state and redirects the user to the login page if they are not logged in.
    const unsubscribe = auth.onAuthStateChanged((user) => {
      //Dont Render any of our application until our current user being set for the very first time
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  });

  const value = {
    currentUser,
    signup,
    loginWithEmail,
    loginWithGmail,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
