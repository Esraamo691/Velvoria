import React from "react";

export default function Loading() {
  return (
    <>
      <div className="flex flex-col justify-center bg-[#433f32] opacity-70 items-center min-h-screen">
        <div className="flex gap-3 mb-4">
          <h1 className=" font-bold"></h1>
        </div>
        <div className="loader mt-4"></div>
      </div>
    </>
  );
}
