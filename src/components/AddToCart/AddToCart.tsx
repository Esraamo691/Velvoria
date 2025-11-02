"use client";
import { CardFooter } from "../ui/card";
import { HeartIcon, Loader2, ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../Context/CartContext";
import { addToCartAction } from "@/app/(pages)/products/_action/addToCart.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddToCart({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { getCart, setCartData } = useContext(CartContext);

  const session = useSession();
  let navigate = useRouter();

  async function addProductToCart() {
    if (session.status == "authenticated") {
      setIsLoading(true);
      const data = await addToCartAction(productId);
      // await getCart();
      setCartData(data);
      data.status == "success" && toast.success(data.message);
      setIsLoading(false);
      console.log(data);
    } else {
      navigate.push("/login");
    }
  }

  return (
    <>
      <CardFooter className=" gap-1">
        <Button
          disabled={isLoading}
          onClick={addProductToCart}
          className="grow cursor-pointer  rounded-4xl  text-[17px] py-6 text-[#E8CFA8]  bg-[#635d4a] hover:text-[#E8CFA8] hover:bg-[#433f32]"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <ShoppingCartIcon />
          )}{" "}
          Add To Cart
        </Button>
      </CardFooter>
    </>
  );
}
