import { createContext, useContext, useState } from "react";
import { wishListServiceFactory } from "../services/wishListService"; 
import { useService } from "../hooks/useService";

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const wishlistService = useService(wishListServiceFactory);

  const onAddToWishListClick = async (_id) => {
    try {
        await wishlistService.create(_id);

      } catch (error) {
        console.error('Error adding item to wishlist:', error);
      }
  };

  const onRemoveFromWishListClick = async (_id) => {
    try {
        await wishlistService.remove(_id);

      } catch (error) {
        console.error('Error removing item to wishlist:', error);
      }
  };

  const context = {
    onAddToWishListClick,
    onRemoveFromWishListClick
  };



  return (
    <WishListContext.Provider value={context}>{children}</WishListContext.Provider>
  );
};

export const useWishListContext = () => {
  const context = useContext(WishListContext);

  return context;
};
