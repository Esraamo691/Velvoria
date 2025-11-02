"use client";
import { FaTrashAlt } from "react-icons/fa";
import Loading from "@/app/loading";
import { CartContext } from "@/components/Context/CartContext";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/Helpers/formatPrice";
import { CartResponse } from "@/interfaces";
import { Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import Checkout from "@/components/Checkout/Checkout";

export default function Cart() {
  let { cartData, isLoading, getCart, setCartData } = useContext(CartContext);
  const [RemovingId, setRemovingId] = useState<string | null>(null);
  const [updateId, setUpdateId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState<boolean>(false);
  if (
    typeof cartData?.data.products[0]?.product == "string" ||
    cartData == null
  ) {
    getCart();
  }

  async function removeCartItem(productId: string) {
    setRemovingId(productId);
    const response = await fetch(
      `/api/remove-cart-item?productId=${productId}`,
      {
        method: "DELETE",
      }
    );
    const data: CartResponse = await response.json();
    if (data.status === "success") {
      toast.success("Product Removed Successfully");
      setCartData(data);
    }
    setRemovingId(null);
  }

  async function clearCart() {
    setIsClearing(true);
    const response = await fetch(`/api/clear-cart`, {
      method: "DELETE",
    });
    const data: CartResponse = await response.json();
    if (data.message === "success") {
      toast.success("Cart Cleared Successfully");
      setCartData(null);
    }
    setIsClearing(false);
  }

  async function updateCartItemCount(productId: string, count: number) {
    if (count === 0) {
      removeCartItem(productId);
    } else {
      setUpdateId(productId);
      const response = await fetch(`/api/update-cart-item`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, count }),
      });
      const data: CartResponse = await response.json();
      if (data.status === "success") {
        toast.success("Product Quantity Updated Successfully");
        setCartData(data);
      }
      setUpdateId(null);
    }
  }

  return (
    <>
      {isLoading || typeof cartData?.data.products[0]?.product == "string" ? (
        <Loading />
      ) : cartData?.numOfCartItems! > 0 ? (
        <div className="container mx-auto px-4 pt-25 py-6">
          <h1 className=" text-3xl tracking-tight font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground mt-1">1 items in your cart</p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start mt-6">
            {/* items column*/}
            <div className="space-y-4 lg:col-span-2">
              {cartData?.data.products.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card"
                >
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-24 h-24 rounded-lg object-cover md:w-28 md:h-28"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                          {item.product.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">
                          {item.product.brand.name} .{" "}
                          {item.product.category.name}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-semibold">
                          {formatCurrency(item.price)}
                        </div>
                      </div>
                    </div>
                    <div className="flex mt-3 items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          disabled={item.count == 1}
                          onClick={() =>
                            updateCartItemCount(
                              item.product._id,
                              item.count - 1
                            )
                          }
                          aria-label="decrease"
                          className="size-8 rounded-lg border hover:bg-accent"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-medium">
                          {" "}
                          {updateId == item.product._id ? (
                            <Loader2 className="animate-spin " />
                          ) : (
                            item.count
                          )}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItemCount(
                              item.product._id,
                              item.count + 1
                            )
                          }
                          aria-label="increase"
                          className="size-8 rounded-lg border hover:bg-accent"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeCartItem(item.product.id)}
                        className="text-destructive hover:underline text-sm cursor-pointer flex gap-1 items-center"
                        aria-label="remove"
                        disabled={RemovingId == item.product.id}
                      >
                        {RemovingId == item.product.id && (
                          <Loader2 className="animate-spin " />
                        )}{" "}
                        <FaTrashAlt className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Summary Column */}
            <div className="sticky  top-23 lg:col-span-1">
              <div className="rounded-xl bg-[#ece8d7] border p-5 shadow-sm">
                <h2 className="text-lg font-semibold">Order Summary</h2>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Subtotal ({cartData?.numOfCartItems} items)
                    </span>
                    <span className="font-semibold">
                      {formatCurrency(cartData?.data.totalCartPrice!)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Shipping
                    </span>
                    <span className=" font-medium bg-[#ace8a8] py-1 px-3 rounded-full text-emerald-600">
                      Free
                    </span>
                  </div>
                  <div className="border-t my-4">
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold">
                        {formatCurrency(cartData?.data.totalCartPrice!)}
                      </span>
                    </div>
                    <div className="flex flex-col gap-3 mt-3">
                      <Checkout cartId={cartData?.cartId!} />
                      <Button className="p-5 text-[16px] text-[#beb89a]  bg-[#433f32]">
                        Continue Shopping
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                className="text-destructive hover:text-destructive mt-2 ms-auto flex cursor-pointer"
                variant={"outline"}
                onClick={clearCart}
              >
                {isClearing ? <Loader2 className="animate-spin" /> : <Trash2 />}{" "}
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[60vh] flex justify-center items-center flex-col">
          <h2 className="text-2xl mb-3">Your Cart Is Empty</h2>
          <Link href={"/products"}>
            <Button>Add Ones</Button>
          </Link>
        </div>
      )}
    </>
  );
}
