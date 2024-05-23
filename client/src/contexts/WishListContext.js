import { createContext, useContext, useState, useEffect } from "react";
import { wishListServiceFactory } from "../services/wishListService";
import { useService } from "../hooks/useService";
import { AuthContext } from "./AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const wishlistService = useService(wishListServiceFactory);
  const { isAuthenticated, userId } = useContext(AuthContext);
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);
  const [wishlistCount, setWishlistCount] = useState(0);
  const wishListCountGreaterThanZero = wishlistCount > 0;

  const [jewelries, setJewelries] = useState([]);

  const userUUID = localStorage.getItem("userUUID");

  let user;

  if (!userId) {
    user = userUUID;
  } else {
    user = userId;
  }

  const fetchData = async () => {
    try {
      const data = await wishlistService.display(user);
      setJewelries(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [jewelries]);


  const handleLikedByUser = (_id) => {
    fetchData();
  };

  useEffect(() => {
    setWishlistCount(isAuthenticated ? jewelries.length : wishlist.length);
  }, [wishlist, jewelries]);

  const onAddToWishListClick = async (_id) => {
    try {
      if (isAuthenticated) {
        await wishlistService.create(_id);
      } else {
        setWishlist((state) => [...state, _id]);
      }
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
    }
  };

  const onRemoveFromWishListClick = async (_id) => {
    try {
      if (isAuthenticated) {
        await wishlistService.remove(_id);
      } else {
        setWishlist((state) => state.filter((id) => id !== _id));
      }
    } catch (error) {
      console.error("Error removing item to wishlist:", error);
    }
  };

  const context = {
    onAddToWishListClick,
    onRemoveFromWishListClick,
    wishlist,
    wishlistCount,
    wishListCountGreaterThanZero,
    jewelries,
    handleLikedByUser,
  };

  return (
    <WishListContext.Provider value={context}>
      {children}
    </WishListContext.Provider>
  );
};

export const useWishListContext = () => {
  const context = useContext(WishListContext);

  return context;
};
