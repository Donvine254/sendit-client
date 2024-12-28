import {
  Clock10Icon,
  Globe,
  ShieldCheckIcon,
  TagIcon,
  Trophy,
} from "lucide-react";
import React from "react";
import Image from "next/image";
export default function Features() {
  return (
    <section className="bg-[#f8f9fa] py-6 sm:py-10 md:py-12">
      <div className="bg-[url('/why-us-bg.png')] bg-contain bg-center bg-no-repeat">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl font-bold text-center text-blue-500 py-1 px-4 border bg-gray-200 w-fit">
              Why Choose Us
            </p>
            <h1 className="text-4xl font-bold text-center">Our Features</h1>
          </div>

          {/* Features */}
          <div className="mt-8 flex flex-col gap-2 md:grid md:grid-cols-3 md:gap-8">
            {/* Feature 1 */}
            <div className="py-2 space-y-4 flex flex-col items-center">
              <div className="flex justify-between gap-2">
                <div className="w-fit h-fit px-2 py-2 bg-blue-500 rounded-md">
                  <Trophy fill="none" className="text-white" size={40} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Fast Delivery</h3>
                  <p className="mt-2 text-base text-gray-600">
                    Get your parcels delivered quickly and securely with our
                    reliable and efficient courier services.
                  </p>
                </div>
              </div>
              <div className="flex justify-between gap-2">
                <div className="w-fit h-fit px-2 py-2 bg-blue-500 rounded-md">
                  <TagIcon fill="none" className="text-white" size={40} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Affordable Pricing</h3>
                  <p className="mt-2 text-base text-gray-600">
                    Enjoy competitive rates without compromising on the quality
                    of our delivery services.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="space-y-2 py-2 flex flex-col items-center">
              <Image
                src="https://res.cloudinary.com/dipkbpinx/image/upload/v1735326181/illustrations/j4s8ydea0b24pvfg7rr9.webp"
                width={680}
                placeholder="blur"
                blurDataURL="/vehicle-placeholder.png"
                height={680}
                alt="courier service vehicle"
              />
              <div className="flex justify-between gap-2">
                <div className="w-fit h-fit px-2 py-2 bg-blue-500 rounded-md">
                  <ShieldCheckIcon
                    fill="none"
                    className="text-white"
                    size={40}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Secure Handling</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    We prioritize the safety of your packages with secure
                    handling and reliable tracking options.
                  </p>
                </div>
              </div>
            </div>
            {/* show this only in small devices */}
            <div className="flex md:hidden justify-between gap-2">
              <div className="w-fit h-fit px-2 py-2 bg-blue-500 rounded-md">
                <Globe fill="none" className="text-white" size={40} />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Nationwide Coverage</h3>
                <p className="mt-2 text-base text-gray-600">
                  Delivering your packages to any location across the country
                  with unmatched efficiency.
                </p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="space-y-4 py-2 hidden  md:flex flex-col  items-center ">
              <div className="flex justify-between gap-2 items-start">
                <div>
                  <h3 className="text-xl font-semibold text-right">
                    24/7 Support
                  </h3>
                  <p className="mt-2 text-base text-gray-600 text-right">
                    Our customer service team is available around the clock to
                    address your concerns and queries.
                  </p>
                </div>
                <div className="w-fit h-fit px-2 py-2 bg-blue-500 rounded-md">
                  <Clock10Icon className="text-white" fill="none" size={40} />
                </div>
              </div>
              <div className="flex justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold text-right">
                    Nationwide Coverage
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 text-right">
                    Delivering your packages to any location across the country
                    with unmatched efficiency.
                  </p>
                </div>
                <div className="w-fit h-fit px-2 py-2 bg-blue-500 rounded-md">
                  <Globe fill="none" className="text-white" size={40} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
