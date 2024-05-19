// import { useState } from "react";

// export const useLocalStorage = (key, initialValue) => {
//   const [state, setState] = useState(() => {
//     const persistedStatesSerialized = localStorage.getItem(key);
//     if (persistedStatesSerialized) {
//       const persistedState = JSON.parse(persistedStatesSerialized);

//       return persistedState;
//     }

//     return initialValue;
//   });

//   const setLocalStorageState = (value) => {
//     setState(value);

//     localStorage.setItem(key, JSON.stringify(value));
//   };

//   return [state, setLocalStorageState];
// };


import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    try {
      const persistedStatesSerialized = localStorage.getItem(key);
      if (persistedStatesSerialized) {
        const persistedState = JSON.parse(persistedStatesSerialized);
        return persistedState;
      }
    } catch (error) {
      console.error("Error parsing localStorage:", error);
    }

    return initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Error storing state in localStorage:", error);
    }
  }, [key, state]);

  return [state, setState];
};
