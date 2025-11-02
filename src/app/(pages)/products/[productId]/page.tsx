import { ProductI } from "@/interfaces";
import { Params } from "next/dist/server/request/params";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

import StarIcon from "@/components/icons/starIcon";
import { Button } from "@/components/ui/button";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import ProductSlider from "@/components/productSlider/productSlider";
import AddToWishlist from "@/components/AddToWishlist/AddToWishlist";
import AddToCart from "@/components/AddToCart/AddToCart";
export default async function ProductDetails({ params }: { params: Params }) {
  let { productId } = await params;
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products/" + productId
  );
  const { data: product }: { data: ProductI } = await response.json();

  return (
    <>
      <Card className="grid md:grid-cols-3 items-center">
        <div className="col-span-1">
          <ProductSlider images={product.images} altContent={product.title} />
        </div>
        <div className="md:col-span-2 space-y-4 p-4">
          <CardHeader>
            <CardDescription>{product.brand.name}</CardDescription>
            <CardTitle className=" text-2xl"> {product.title} </CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <CardDescription>{product.category.name}</CardDescription>
            <div className="flex justify-between items-center mt-3">
              <p className="flex gap-1 ">
                <StarIcon /> <span>{product.ratingsAverage}</span>
              </p>
              <p>
                Remaining <span>{product.ratingsQuantity}</span>
              </p>
            </div>
            <div className="flex justify-between items-center mt-3">
              <p>
                Quantity: <span>{product.quantity}</span>
              </p>

              <p className="flex gap-1 items-center">
                EGP
                <span className="text-xl font-semibold">{product.price}</span>
              </p>
            </div>
          </CardContent>
          <CardFooter className="gap-1">
            <AddToWishlist productId={product.id} />
            <AddToCart productId={product.id} />
          </CardFooter>
        </div>
      </Card>
    </>
  );
}
