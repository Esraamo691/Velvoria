"use client";
import { ProductI } from "@/interfaces/product";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "@/components/AddToCart/AddToCart";
import AddToWishlist from "@/components/AddToWishlist/AddToWishlist";
import StarIcon from "@/components/icons/starIcon";

export default function ProductsList({ products }: { products: ProductI[] }) {
  return (
    <div className="grid pt-16 grid-cols-1 lg:px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6 mb-10">
      {products && products.length > 0 ? (
        products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="relative bg-[#ece8d7] dark:bg-[#F5E8D0] transition-shadow duration-300">
              <AddToWishlist productId={product.id} />
              <Link href={`/products/${product.id}`}>
                <Image
                  src={product.imageCover}
                  className="w-full rounded-t-xl object-cover"
                  width={300}
                  height={300}
                  alt={product.title}
                />
                <CardHeader className="mt-3">
                  <CardTitle className="line-clamp-2 text-[#3f3c2f]">
                    {product.title.split(" ", 2).join(" ")}
                  </CardTitle>
                  <CardDescription className="text-[#3f3c2f]">
                    {product.category.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-center">
                  <div className="flex gap-1 items-center ">
                    <StarIcon />
                    <p className="text-sm font-medium text-gray-600">
                      {product.ratingsAverage}
                    </p>
                  </div>
                  <p className="font-bold text-[#3f3c2f]">
                    {product.price} EGP
                  </p>
                </CardContent>
              </Link>
              <AddToCart productId={product.id} />
            </Card>
          </motion.div>
        ))
      ) : (
        <div className="col-span-full flex justify-center items-center min-h-[50vh]">
          <p className="text-lg font-medium text-gray-500">
            No products found for this category.
          </p>
        </div>
      )}
    </div>
  );
}
