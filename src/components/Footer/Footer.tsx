import React from "react";
import Image from "next/image";
import { ImLinkedin } from "react-icons/im";
import { FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa";
import { IoHeartCircleSharp } from "react-icons/io5";
import { Link } from "lucide-react";
export default function Footer() {
  return (
    <>
      <div className=" border-t-gray-300 border-t-1 bg-[#1f1e17] px-20">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 mx-auto py-8 border-b border-[#beb89a] pb-7">
          <div>
            <div className="flex gap-3 w-70 mb-4">
              <Image
                src="/assests/logo.png"
                width={100}
                height={100}
                className="object-cover w-full  "
                alt="..."
              />{" "}
            </div>
            <p className="text-[#beb89a] mt-10  mb-10">
              Discover the latest technology, fashion, and lifestyle products,
              Quality
              <br /> guaranteed with fast shipping and excellent customer
              service.
            </p>
            <div className="flex gap-3">
              <Link
                className=" text-transparent"
                href="https://www.linkedin.com/in/esraa-mohamed-955222320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              >
                <ImLinkedin className="text-2xl text-[#beb89a] hover:text-[#6d6852] transition-all duration-100 cursor-pointer" />
              </Link>
              <Link
                className=" text-transparent"
                href="https://github.com/Esraamo691"
              >
                <FaGithub className="text-2xl text-[#beb89a] hover:text-[#6d6852] transition-all duration-100 cursor-pointer" />
              </Link>
              <Link
                className=" text-transparent"
                href="https://www.facebook.com/share/1FWEW1EWN4/"
              >
                <FaFacebookF className="text-2xl text-[#beb89a] hover:text-[#6d6852] transition-all duration-100 cursor-pointer" />
              </Link>
              <Link
                className=" text-transparent"
                href="https://www.instagram.com/esraa5238mohamed?utm_source=qr"
              >
                <FaInstagram className="text-2xl text-[#beb89a] hover:text-[#6d6852] transition-all duration-100 cursor-pointer" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-[#beb89a]">
            <div className="">
              <h2 className=" mb-4 text-[#6d6852]">Product</h2>
              <p className=" mb-4 hover:text-[#6d6852] transition-all duration-100 cursor-pointer">
                Features
              </p>
              <p className=" mb-4 hover:text-[#6d6852] transition-all duration-100 cursor-pointer">
                Pricing
              </p>
              <p className=" mb-4 hover:text-[#6d6852] transition-all duration-100 cursor-pointer">
                Integrations
              </p>
              <p className="hover:text-[#6d6852] transition-all duration-100 cursor-pointer">
                Changelog
              </p>
            </div>
            <div className="">
              <h2 className="text-[#6d6852] mb-4">Resources</h2>
              <p className=" mb-4 hover:text-[#6d6852] transition-all duration-100 cursor-pointer">
                Documentation
              </p>
              <p className=" mb-4 hover:text-[#6d6852] transition-all duration-100 cursor-pointer">
                Tutorials
              </p>
              <p className=" mb-4 hover:text-[#6d6852] transition-all duration-100 cursor-pointer">
                Blog
              </p>
              <p className="hover:text-[#6d6852] transition-all duration-100 cursor-pointer ">
                Support
              </p>
            </div>
            <div className=" mb-4">
              <h2 className="text-[#6d6852] mb-4">Company</h2>
              <p className="hover:text-[#6d6852] transition-all duration-100 cursor-pointer mb-4">
                About
              </p>
              <p className="hover:text-[#6d6852] transition-all duration-100 cursor-pointer mb-4">
                Careers
              </p>
              <p className="hover:text-[#6d6852] transition-all duration-100 cursor-pointer mb-4">
                Contact
              </p>
              <p className="hover:text-[#6d6852] transition-all duration-100 cursor-pointer ">
                Partners
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between py-7 text-[#beb89a]">
          <p className="flex gap-2 items-center">
            <IoHeartCircleSharp className="text-[19px]" /> 2025 Velvoria, All
            rights reserved.
          </p>
          <div className="flex gap-4">
            <p className="underline underline-offset-2">Privacy Policy</p>
            <p className="underline underline-offset-2">Terms of Services</p>
            <p className="underline underline-offset-2">Cookies Settings</p>
          </div>
        </div>
      </div>
    </>
  );
}
