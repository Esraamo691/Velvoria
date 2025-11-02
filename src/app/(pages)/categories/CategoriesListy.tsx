"use client";

import { motion } from "framer-motion";
import { CategoryI } from "@/interfaces";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface CategoriesClientProps {
  categories: CategoryI[];
}

export default function CategoriesListy({ categories }: CategoriesClientProps) {
  return (
    <div className="grid grid-cols-1 pt-18 lg:px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-15 mt-5 min-h-[75vh] ">
      {categories.map((category) => (
        <motion.div
          key={category._id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="p-4 h-72 w-full bg-[#ece8d7] flex flex-col overflow-hidden rounded-2xl transition-shadow duration-400">
            <Link href={`/products?category=${category._id}`}>
              <div className="w-full h-48 relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="rounded-md object-cover"
                />
              </div>
            </Link>
            <CardHeader className="text-center mt-3 flex-1 flex items-center justify-center">
              <CardTitle className="font-bold text-base">
                {category.name}
              </CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
