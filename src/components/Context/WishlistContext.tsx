"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export const WishlistContext = createContext<{
  wishlistData: any;
  setWishlistData: (val: any) => void;
  isLoading: boolean;
  getWishlist: () => void;
  removeProduct: (productId: string) => void;
}>({
  wishlistData: null,
  setWishlistData: () => {},
  isLoading: false,
  getWishlist: () => {},
  removeProduct: () => {},
});

export default function WishlistContextProvider({ children }: { children: ReactNode }) {
  const [wishlistData, setWishlistData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const session = useSession();

  async function getWishlist() {
    if (session.status === "authenticated") {
      try {
        const response = await fetch("/api/get-wishlist");
        const data = await response.json();
        setWishlistData(data);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setWishlistData(null);
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function removeProduct(productId: string) {
  try {
    const response = await fetch(`/api/remove-wishlist-item/${productId}`, { method: "DELETE" })
    const data = await response.json();

    if (data.status === "success") {
      toast.success("Product removed from wishlist");
      await getWishlist();
    } else {
      toast.error("Failed to remove product");
      console.error("Remove error:", data);
    }
  } catch (err) {
    console.error("Error removing product:", err);
    toast.error("Something went wrong");
  }
}


  useEffect(() => {
    getWishlist();
  }, [session.status]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistData,
        setWishlistData,
        isLoading,
        getWishlist,
        removeProduct,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
