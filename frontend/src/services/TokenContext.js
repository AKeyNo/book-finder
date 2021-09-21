import React, { useContext, useState } from 'react';

const TokenContext = React.createContext();
const TokenUpdateContext = React.createContext();

export const useToken = () => {
  return useContext(TokenContext);
};
export const useTokenUpdate = () => {
  return useContext(TokenUpdateContext);
};

export const TokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const updateAccessToken = (newAccessToken) => {
    setAccessToken(newAccessToken);
  };

  return (
    <TokenContext.Provider value={accessToken}>
      <TokenUpdateContext.Provider value={updateAccessToken}>
        {children}
      </TokenUpdateContext.Provider>
    </TokenContext.Provider>
  );
};
