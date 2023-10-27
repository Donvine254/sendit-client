"use client";

import Image from "next/image";
import Link from "next/link";
import picture from "../public/hero-bg.png";
const Hero = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5  w-full mt-2 overflow-hidden">
      <div className="p-2 mx-5">
        <h1 className="text-3xl md:text-5xl md:leading-loose lg:text-6xl font-extrabold xsm:leading-loose">
          Deliver Anything, Anywhere, Anytime!
        </h1>
        <p className="py-4 text-[27px] font-light lg:py-6 leading-loose">
          Discover how sendit empowers small businesses, traders and individuals
          through reliable courier delivery services today.
        </p>
        <div className="flex items-center gap-5 lg:gap-10">
          <Link href="/deliveries" className="btn btn-primary hero-btn-1">
            Send Parcel
          </Link>
          <Link
            href="/contact"
            className="btn btn-outline flex items-center justify-start gap-1 hero-btn">
            Learn More &#x27F6;
          </Link>
        </div>
      </div>
      <div className="hidden lg:block">
        <Image src={picture} alt="hero-image" priority />
      </div>
    </div>
  );
};

export default Hero;
