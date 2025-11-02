"use client";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoSunny } from "react-icons/io5";
import { HiMenuAlt1 } from "react-icons/hi";
import { RiUserHeartFill } from "react-icons/ri";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { Loader2, ShoppingCartIcon, UserIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { CartContext } from "../Context/CartContext";
import { signOut, useSession } from "next-auth/react";
import { FaHeart } from "react-icons/fa";
import { WishlistContext } from "../Context/WishlistContext";
interface NavbarProps {
  mode: "light" | "dark";
  changeMode: () => void;
}
export default function Navbar({ mode, changeMode }: NavbarProps) {
  const { isLoading, cartData } = useContext(CartContext);
  const { wishlistData } = useContext(WishlistContext);
  const session = useSession();
  const wishlistCount = wishlistData?.data?.length || 0;
  const [open, setOpen] = useState(false);
  function changeOpen() {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }
  return (
    <>
      <nav className=" py-3 px-4 sm:px-0 lg:px-4  backdrop-blur-2xl shadow text-2xl font-semibold fixed w-full z-50 top-0">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1>
              <Link href={"/"} className="flex">
                <Image
                  src="/assests/logonav.png"
                  width={200}
                  height={200}
                  className=" w-full bg-cover rounded-xl "
                  alt="..."
                />
                <Image
                  src="/assests/logo.png"
                  width={100}
                  height={100}
                  className="object-cover w-full  "
                  alt="..."
                />{" "}
              </Link>
            </h1>
            <div className="order-first lg:order-none ">
              <NavigationMenu className="hidden lg:flex ">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/products">Products</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/categories">Categories</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/brands">Brands</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link href="/allorders">Orders</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <div
                onClick={() => changeOpen()}
                className="lg:hidden cursor-pointer"
              >
                <HiMenuAlt1 />
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="cursor-pointer" onClick={() => changeMode()}>
                {mode == "dark" ? (
                  <IoSunny className="text-[#E8CFA8]" />
                ) : (
                  <BsFillMoonStarsFill className="text-[#2c2921] " />
                )}
              </div>

              <Link href="/wishlist" className="relative">
                <FaHeart className="size-6 text-[#2c2921] dark:text-[#E8CFA8]" />
                {wishlistCount > 0 && (
                  <div className="w-5 h-5 text-sm font-semibold flex justify-center items-center rounded-full absolute -top-3 -right-3 bg-[#a99e7f] text-white">
                    {wishlistCount}
                  </div>
                )}
              </Link>

              {session.status == "authenticated" && (
                <Link
                  href={"/cart"}
                  className="text-[#2c2921] dark:text-[#E8CFA8] relative p-3"
                >
                  <ShoppingCartIcon />
                  <Badge className="bg-[#2c2921] size-5 absolute top-0 end-0 rounded-full  dark:bg-[#a99e7f] ">
                    <span className=" text-[#a99e7f] dark:text-white">
                      {isLoading ? (
                        <Loader2 className="animate-spin size-4" />
                      ) : (
                        cartData?.numOfCartItems
                      )}
                    </span>
                  </Badge>
                </Link>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer outline-0 text-[#2c2921] dark:text-[#E8CFA8]">
                  <RiUserHeartFill />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#a99e7f]">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {session.status == "authenticated" ? (
                    <>
                      <DropdownMenuItem
                        onClick={() =>
                          signOut({
                            callbackUrl: "/",
                          })
                        }
                      >
                        Logout
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <Link href={"/login"}>
                        <DropdownMenuItem>Login</DropdownMenuItem>
                      </Link>
                      <Link href={"/register"}>
                        <DropdownMenuItem>Register</DropdownMenuItem>
                      </Link>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {open ? (
            <ul className="space-y-2 mt-2 text-[16px] lg:hidden">
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/categories">Categories</Link>
              </li>
              <li>
                <Link href="/brands">Brands</Link>
              </li>
              <li>
                <Link href="/orders">Orders</Link>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </nav>
    </>
  );
}
