import React, { useState, useEffect } from 'react';
import { useStore } from 'store';
import { validateToken } from 'lib/auth';

export const AuthenticationProvider: React.FC = ({ children }) => {
  // if token exists in store, validate it
  //  if expired, delete from store
  //  if valid, keep in store and set user in global state
  const { setUser, clearUser } = useStore(state => ({
    user: state.auth,
    setUser: state.setUser,
    clearUser: state.clearUser
  }));

  useEffect(() => {
    const getAuthenticatedUser = async () => {
      const authUser = await validateToken();
      if (authUser) {
        setUser(authUser);
      } else {
        clearUser();
      }
    }
    getAuthenticatedUser();
  }, [])

  return (
    <>{ children }</>
  );
}