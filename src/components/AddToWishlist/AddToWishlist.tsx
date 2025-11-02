"use client";
import { useContext, useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // ← ضيف FaHeart هنا
import { WishlistContext } from "@/components/Context/WishlistContext";
import { addToWishlistAction } from "@/app/(pages)/products/_action/addToWishlist.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddToWishlist({ productId }: { productId: string }) {
  const { wishlistData, getWishlist, removeProduct } =
    useContext(WishlistContext);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    const found = wishlistData?.data?.some(
      (item: any) => item._id === productId
    );
    setIsInWishlist(!!found);
  }, [wishlistData, productId]);

  async function addProduct() {
    if (session.status === "authenticated") {
      try {
        const data = await addToWishlistAction(productId);
        if (data.status === "success") {
          setIsInWishlist(true);
          toast.success("Added to wishlist");
          await getWishlist();
        } else {
          toast.error("Failed to add product");
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
      }
    } else {
      router.push("/login");
    }
  }

  async function removeProductFromWishlist() {
    setIsInWishlist(false);
    try {
      await removeProduct(productId);
    } catch (error) {
      toast.error("Error removing product");
      console.error(error);
    }
  }

  async function toggleWishlist() {
    if (isInWishlist) {
      await removeProductFromWishlist();
    } else {
      await addProduct();
    }
  }

  return (
    <button
      onClick={toggleWishlist}
      className="cursor-pointer absolute top-3 right-3"
      aria-label="Add to wishlist"
    >
      {isInWishlist ? (
        <FaHeart className="ms-auto size-6 text-[#a99e7f] transition-colors duration-200" />
      ) : (
        <FaRegHeart className="ms-auto size-6 text-[#a99e7f] transition-colors duration-200" />
      )}
    </button>
  );
}
