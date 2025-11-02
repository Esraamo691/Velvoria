import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { brandI } from "@/interfaces";
export default async function Brands() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
  const { data: brands }: { data: brandI[] } = await response.json();
  console.log(brands);

  return (
    <>
      <div className="grid grid-cols-1 pt-18 lg:px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 mb-15 mt-5 ">
        {brands.map((brand) => (
          <div key={brand._id}>
            <Card className=" p-4 h-72 w-full flex flex-col overflow-hidden  transition-shadow duration-400 text-[#3f3c2f] bg-[#ece8d7]">
              <Link href={`/products?brand=${brand._id}`}>
                <div className="w-full h-48 relative">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="rounded-md object-cover max-w-full transform scale-117"
                  />
                </div>
              </Link>

              <CardHeader className="text-center mt-3 flex-1 flex items-center justify-center">
                <CardTitle className="font-bold text-base">
                  {brand.name}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
