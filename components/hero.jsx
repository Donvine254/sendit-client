"use client";

import Image from "next/image";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-start justify-start w-full bg-base-100 mt-2">
      <div className="md:w-1/2 p-2 mx-5">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold">
          Deliver Anything, Anywhere, Anytime!
        </h1>
        <p className="py-4 text-[27px] font-light lg:py-6 leading-loose">
          Discover how sendit empowers small businesses, traders and individuals
          through reliable courier delivery services today
        </p>
        <div className="flex items-center gap-10">
          <Link href="/delivery" className="btn btn-primary ">
            Create your first delivery now!
          </Link>
          <Link href="/about" className="btn btn-outline">
            Learn More
          </Link>
        </div>
      </div>
      <div className="flex-1">
        <Image
          src="/./hero-image.png"
          alt="hero"
          width={830}
          height={670}
          className=""
        />
      </div>
    </div>
  );
};

export default Hero;
