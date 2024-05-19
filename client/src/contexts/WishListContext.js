import { createContext, useContext, useState } from "react";
import { wishListServiceFactory } from "../services/wishListService";
import { useService } from "../hooks/useService";
import { AuthContext } from "./AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const wishlistService = useService(wishListServiceFactory);
  const { isAuthenticated } = useContext(AuthContext);
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);
  const [wishlistCount, setWishlistCount] = useState(0);

  const onAddToWishListClick = async (_id) => {
    try {
      if (isAuthenticated) {
        await wishlistService.create(_id);
      } else {
        setWishlist((state) => [...state, _id]);
      }

      setWishlistCount(wishlist.length);
      console.log(wishlistCount);
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
      setWishlistCount(wishlist.length);
    } catch (error) {
      console.error("Error removing item to wishlist:", error);
    }
  };

  const context = {
    onAddToWishListClick,
    onRemoveFromWishListClick,
    wishlist,
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
