"use client";

import Image from "next/image";
import Link from "next/link";
import picture from "../public/hero-image.png"
const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-start justify-start w-full bg-base-100 mt-2 overflow-hidden">
      <div className="lg:w-1/2 p-2 mx-5">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold">
          Deliver Anything, Anywhere, Anytime!
        </h1>
        <p className="py-4 text-[27px] font-light lg:py-6 md:leading-loose">
          Discover how sendit empowers small businesses, traders and individuals
          through reliable courier delivery services today.
        </p>
        <div className="flex items-center gap-5 lg:gap-10">
          <Link href="/deliveries" className="btn btn-primary hero-btn-1">
            Send Parcel
          </Link>
          <Link href="/contact" className="btn btn-outline flex items-center justify-start gap-1 hero-btn">
            Learn More &#x27F6;
          </Link>
        </div>
      </div>
      <div className="flex-1 items-center">
        <Image
          src={picture}
          alt="hero-image"
          
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
