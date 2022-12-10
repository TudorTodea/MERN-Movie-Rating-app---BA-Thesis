import React, { useState } from 'react';
let logoutTimer;
const AuthContext = React.createContext({
  token: '',
  username: '',
  isLoggedIn: false,
  login: (token) => { },
  logout: () => { },
});
const calculateRemainingTim = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const [username, setUsername] = useState('');
  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };
  const loginHandler = (token, expirationTime, username, id) => {
    setToken(token);
    setUsername(username);
    localStorage.setItem('token', token);
    localStorage.setItem('userid', id);
    localStorage.setItem('username', username);

    const remainingTime = calculateRemainingTim(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const contextValue = {
    token: token,
    username: username,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
