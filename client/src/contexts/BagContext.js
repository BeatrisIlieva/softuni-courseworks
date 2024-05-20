import { createContext, useContext, useState, useEffect } from "react";
import { bagServiceFactory } from "../services/bagService";
import { useService } from "../hooks/useService";
import { AuthContext } from "./AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const BagContext = createContext();

export const BagProvider = ({ children }) => {
  const bagService = useService(bagServiceFactory);
  const { isAuthenticated } = useContext(AuthContext);
  const [bag, setBag] = useLocalStorage("bag", []);
  const [bagCount, setBagCount] = useState(0);
  const bagCountGreaterThanZero = bagCount > 0;

  useEffect(() => {
    setBagCount(bag.length);
  }, [bag]);

  const onAddToBagClick = async (_id, data) => {
    try {
      if (isAuthenticated) {
        await bagService.add(_id, data);
      } else {
        setBag((state) => [...state, _id]);
      }

    } catch (error) {
      console.error("Error adding item to bag:", error);
    }
  };

  const onRemoveFromBagClick = async (_id) => {
    try {
      if (isAuthenticated) {
        await bagService.remove(_id);
      } else {
        setBag((state) => state.filter((id) => id !== _id));
      }
    } catch (error) {
      console.error("Error removing item from bag:", error);
    }
  };

  const context = {
    onAddToBagClick,
    onRemoveFromBagClick,
    bag,
    bagCount,
    bagCountGreaterThanZero,
  };

  return (
    <BagContext.Provider value={context}>
      {children}
    </BagContext.Provider>
  );
};

export const useBagContext = () => {
  const context = useContext(BagContext);

  return context;
};
