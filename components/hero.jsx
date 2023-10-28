// import picture from "../public/hero-bg.png";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full md:h-screen p-5 md:p-10 bg-hero-bg bg-no-repeat bg-cover">
      <h1 className="text-3xl md:text-5xl  lg:text-[60px] leading-loose font-extrabold md:mt-16 text-center ">
        Deliver Anything, Anywhere, Anytime!
      </h1>
      <div className="lg:w-2/3 mx-auto">
        <p className="py-4 text-[27px] font-light lg:py-6 leading-loose text-center mt-2 md:mt-5 whitespace-break-spaces">
          Discover how sendit empowers small businesses, traders and individuals
          through reliable courier delivery services today.
        </p>
        <div className="flex items-center justify-center mt-5 gap-5 lg:gap-10">
          <Link href="/deliveries" className="btn btn-primary hero-btn-1">
            Send Parcel
          </Link>
          <Link
            href="/contact"
            className="btn btn-outline  flex items-center justify-start gap-1 hero-btn">
            Learn More &#x27F6;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
