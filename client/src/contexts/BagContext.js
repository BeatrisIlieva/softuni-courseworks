import { createContext, useContext, useState, useEffect } from "react";
import { bagServiceFactory } from "../services/bagService";
import { useService } from "../hooks/useService";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuthContext } from "./AuthContext";


export const BagContext = createContext();
export const BagProvider = ({ children }) => {
  const bagService = useService(bagServiceFactory);
  const { isAuthenticated, userId } = useAuthContext();
  const [bag, setBag] = useLocalStorage("bag", []);
  const [bagCount, setBagCount] = useState(0);
  const bagCountGreaterThanZero = bagCount > 0;

  const userUUID = localStorage.getItem('userUUID');
  let user;

  if (!userId) {
    user = userUUID;
  } else {
    user = userId;
  }



  useEffect(() => {
    setBagCount(bag.length);
  }, [bag]);

  const onAddToBagClick = async (data, _id) => {
    try {
      if (isAuthenticated) {
        await bagService.add(data, _id);
      } else {

        setBag((state) => [...state, _id]);
        await bagService.add(data, _id);
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


  const onDisplayBagClick = async() => {
    try {
      if (isAuthenticated) {
        const data = await bagService.display(user);

        return data;
      } else {
        const data = await bagService.display(user);

        return data;
      }
    }catch (error) {
      console.error("Error removing item from bag:", error);
    }
  }

  const context = {
    onAddToBagClick,
    onRemoveFromBagClick,
    bag,
    bagCount,
    bagCountGreaterThanZero,
    onDisplayBagClick
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
