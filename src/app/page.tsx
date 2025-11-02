"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import "animate.css";
export default function Home() {
  return (
    <>
      <div className="grid grid-cols-12 min-h-screen bg-gradient-to-b pt-16 from-[#968f6e] via-[#d8cfae] to-[#f9f8f0]">
        <div className="col-span-6  px-15 pt-15">
          <div className="flex gap-3 items-center">
            <div className="bg-black flex justify-center items-center w-10 h-10 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="">
              <p className="font-bold">5.0 Rated</p>
              <p className="">
                Read Our{" "}
                <span className="underline font-bold">Success Stories</span>
              </p>
            </div>
          </div>
          <div className="font-bold mt-15 pb-10 border-b border-[#7f7861] font-serif text-8xl">
            Velvoria
          </div>
          <div className="py-5 border-b border-[#7f7861]">
            <p className="pb-8 text-[#6d6852] font-semibold">
              Easily Add And Organize Events, With Notifications
              <br /> To Keep Everyone Engaged
            </p>
            <div className="flex">
              <Image
                src="/assests/person.jpg"
                width={50}
                height={50}
                className="rounded-full border-2 object-cover me-3"
                alt="..."
              />
              <div className="flex gap-8">
                <p className="text-[#3f3c2f] font-semibold">
                  Loved the performance
                  <br />
                  100% Satisfied
                </p>
                <p className="font-bold">
                  /{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 inline"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  4.9
                </p>
              </div>
            </div>
          </div>
          <div className="gap-3 flex mt-10">
            <Link href={"/products"}>
              <Button className=" cursor-pointer p-6 bg-transparent text-[#433f32] border-2 font-bold border-[#6d6852] rounded-4xl text-[15px]">
                Shop Now
              </Button>
            </Link>
            <Link href={"/categories"}>
              <Button className="cursor-pointer rounded-4xl  text-[15px]  p-6 text-[#beb89a]  bg-[#433f32]">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
        <div className="col-span-6  flex justify-center items-center">
          <div className="w-[330px] relative h-[500px]  rounded-2xl">
            <Image
              src="/assests/welcome7.jpg"
              width={370}
              height={800}
              className="object-cover w-full h-[500px] rounded-2xl animate__animated animate__slideInDown "
              alt="..."
            />
            <div className="animate__animated animate__slideInLeft absolute flex items-center backdrop-blur-2xl rounded-full border-1 border-[#beb89a] text-black z-10 p-3 px-5 top-3 -left-33 ">
              <span className="w-7 h-7 rounded-full bg-white flex justify-center items-center me-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 font-bold"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                  />
                </svg>
              </span>
              <span className=" bg-clip-text bg-gradient-to-r text-transparent from-[#2c2921] via-[#2c2921] to-[#a99e7f] ">
                Increase in Engagement
              </span>
            </div>

            <div className="animate__animated animate__slideInLeft absolute flex items-center backdrop-blur-2xl rounded-full border-1 border-[#beb89a] text-black z-10 py-2 px-5 bottom-40 -left-25 ">
              <span className="w-7 h-7 rounded-full bg-black flex justify-center items-center me-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="">Verno</span>
            </div>
            <div className="animate__animated animate__slideInLeft absolute flex items-center backdrop-blur-2xl rounded-full border-1 border-[#beb89a] text-black z-10 py-2 px-5 bottom-25 -left-25 ">
              <span className="w-7 h-7 rounded-full bg-black flex justify-center items-center me-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="">Wellness</span>
            </div>
            <div className="animate__animated animate__slideInLeft absolute flex items-center backdrop-blur-2xl rounded-full border-1 border-[#beb89a] text-black z-10 py-2 px-5 bottom-10 -left-25 ">
              <span className="w-7 h-7 rounded-full bg-black flex justify-center items-center me-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="">Fashion</span>
            </div>

            <div className="animate__animated animate__slideInRight absolute bottom-7 backdrop-blur-2xl p-3 rounded-xl -right-17">
              <div className="w-15 h-15 rounded-xl mb-2">
                <Image
                  src="/assests/welcopy.jpg"
                  width={200}
                  height={200}
                  className=" w-full bg-cover rounded-xl"
                  alt="..."
                />
              </div>
              <div className="w-15 h-15 rounded-xl mb-2">
                <Image
                  src="/assests/welcome11.jpg"
                  width={200}
                  height={200}
                  className=" w-full bg-cover rounded-xl"
                  alt="..."
                />
              </div>
              <div className="w-15 h-15 rounded-xl">
                <Image
                  src="/assests/welcome55.jpg"
                  width={200}
                  height={200}
                  className=" w-full bg-cover rounded-xl"
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
