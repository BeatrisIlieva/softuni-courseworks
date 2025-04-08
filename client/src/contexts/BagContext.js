import { createContext, useContext, useState, useEffect } from "react";
import { bagServiceFactory } from "../services/bagService";
import { useService } from "../hooks/useService";
import { useAuthContext } from "./AuthContext";

export const BagContext = createContext();
export const BagProvider = ({ children }) => {
  const bagService = useService(bagServiceFactory);

  let [bagItems, setBagItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const { userId } = useAuthContext();
  const userUUID = localStorage.getItem("userUUID");

  let user;

  if (!userId) {
    user = userUUID;
  } else {
    user = userId;
  }

  useEffect(() => {
    fetchBagItems();
  }, []);

  const fetchBagItems = async () => {
    try {
      let data = await onDisplayBagClick();
      data = Array.isArray(data) ? data[0] : data;

      if (data && data.jewelries && data.jewelries.length > 0) {
        const bagData = data.jewelries;
        const bagItems = bagData[0].documents;
        setBagItems(bagItems);

        const totalPrice = bagData[0].totalTotalPrice;
        setTotalPrice(totalPrice);

        const totalQuantity = bagData[0].totalQuantity;
        setTotalQuantity(totalQuantity);
      } else {
        setBagItems([]);
        setTotalQuantity(0);
        setTotalPrice(0);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onAddToBagClick = async (data, _id) => {
    try {
      await bagService.add(data, _id);

      fetchBagItems();
    } catch (error) {
      console.error("Error adding item to bag:", error);
    }
  };

  const onDisplayBagClick = async () => {
    try {
      const data = await bagService.display(user);

      return data;
    } catch (error) {
      console.error("Error removing item from bag:", error);
    }
  };

  const onDecrement = async (bagId) => {
    await bagService.decrease(bagId);

    fetchBagItems();
  };

  const onIncrement = async (bagId) => {
    await bagService.increase(bagId);

    fetchBagItems();
  };

  const onRemove = async (bagId) => {
    await bagService.remove(bagId);

    fetchBagItems();
  };

  const onQuantityChange = (e, _id) => {
    const newQuantity =
      e.target.value.trim() === "" ? "" : parseInt(e.target.value);

    bagItems = bagItems.map((item) => {
      if (item._id === _id) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });

    setBagItems([...bagItems]);
  };

  const onBlur = async (_id, quantity) => {
    try {
      await bagService.update(_id, { quantity: quantity });

      setBagItems([...bagItems]);

      fetchBagItems();
    } catch (error) {
      console.error("Error updating quantity in the database:", error);
    }
  };

  const clearShoppingBag = () => {
    setBagItems([]);
    setTotalQuantity(0);
    setTotalPrice(0);
  };

  const isEmpty = bagItems.length < 1;

  const context = {
    user,
    bagItems,
    onAddToBagClick,
    onDisplayBagClick,
    totalPrice,
    totalQuantity,
    onDecrement,
    onIncrement,
    onRemove,
    onQuantityChange,
    onBlur,
    isEmpty,
    clearShoppingBag,

  };

  return <BagContext.Provider value={context}>{children}</BagContext.Provider>;
};

export const useBagContext = () => {
  const context = useContext(BagContext);

  return context;
};
