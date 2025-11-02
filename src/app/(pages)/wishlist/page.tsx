"use client";
import React, { useContext } from "react";
import { HeartOff, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { WishlistContext } from "@/components/Context/WishlistContext";
import { Button } from "@/components/ui/button";
import AddToWishlist from "@/components/AddToWishlist/AddToWishlist";
import { ProductI } from "@/interfaces";
import Image from "next/image";
export default function Wishlist() {
  const { wishlistData, isLoading, setWishlistData } =
    useContext(WishlistContext);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Loading wishlist...</p>
      </div>
    );
  }

  if (!wishlistData?.data?.length) {
    return (
      <div className="flex flex-col items-center justify-center  text-center min-h-screen">
        <div className="w-70 h-70">
          <Image
            src="/assests/cracked heart.svg"
            width={200}
            height={200}
            className=" w-full bg-cover "
            alt="..."
          />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-[#413c31]">
          Your wishlist is empty
        </h2>
        <p className=" mb-6 text-[#413c31]">
          Looks like you haven’t added any products yet.
        </p>
        <Link href={"/products"}>
          <Button className=" cursor-pointer bg-[#413c31]">Add ones</Button>
        </Link>
      </div>
    );
  }

  // if has products
  return (
    <div className="container mx-auto px-4 py-10 ">
      <Button
        variant={"outline"}
        className=" flex ms-auto "
        onClick={() => setWishlistData(null)}
      >
        {" "}
        Clear Wishlist
      </Button>
      <div className="grid grid-cols-1 pt-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
        {wishlistData?.data?.map((item: any) => {
          const p = item.product || item;

          return (
            <div
              key={p._id}
              className="bg-[#ece8d7] text-[#3f3c2f] shadow-md rounded-2xl p-4 flex flex-col hover:shadow-lg transition"
            >
              <img
                src={p.imageCover}
                alt={p.title}
                className="max-w-full object-cover size-35 mx-auto rounded-xl mb-4"
              />
              <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                {p.title?.split(" ", 3).join(" ")}
              </h2>
              <p className="text-gray-600 font-medium mb-3">{p.price} EGP</p>
              <div className="flex justify-between">
                <Link href={`/products/${p._id}`}>
                  <span className="font-semibold bg-[#ace8a8] p-2 rounded-full text-[#3f3c2f]">
                    Details
                  </span>
                </Link>
                <AddToWishlist productId={p._id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
