// RecoveryContext.js
import React, { createContext, useContext } from "react";

const RecoveryContext = createContext();

export const useRecoveryContext = () => {
  return useContext(RecoveryContext);
};

export default RecoveryContext;
