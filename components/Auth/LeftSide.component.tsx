import Image from "next/image";
import React from "react";

export default function LeftSide() {
  return (
    <div className="hidden md:block h-screen md:w-1/2">
      <div className="relative h-full">
        <Image
          src="/login-image.svg"
          alt="Image"
          fill
          priority
          style={{ objectFit: "cover" }}
          className="object-contain"
        />
      </div>
    </div>
  );
}
