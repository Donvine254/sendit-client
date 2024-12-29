import React from "react";
import Link from "next/link";
import { Clock, MailIcon, MapPinnedIcon, Phone } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <div>
      <div className="bg-[#f8f9fa] border bg-opacity-80 text-neutral-600  ">
        <div className="mx-6 py-4 ">
          <div className="grid grid-1 gap-2 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="">
              <Link href="/" className="flex items-center gap-1 text-blue-600">
                <Image
                  src="https://res.cloudinary.com/dipkbpinx/image/upload/v1735352741/illustrations/by2cal2orce7rmqsceqi.svg"
                  height={32}
                  width={32}
                  alt="logo"
                  priority
                  className="h-8 w-8 "
                />
                <h2 className="text-xl font-bold uppercase">Sendit</h2>
              </Link>
              <div className="py-2 md:py-4">
                <div className="inline-flex py-2">
                  <MapPinnedIcon fill="none" className="text-blue-500" />
                  <p className="leading-loose font-semibold">
                    &nbsp; 123 Kimathi Street, Nairobi
                  </p>
                </div>
                <div className="flex items-center gap-1 py-2">
                  <Clock fill="none" className="text-blue-500" />
                  <p>Mon - Fri 08.00 - 18.00</p>
                </div>
                <div className="flex items-center gap-4 py-2 text-blue-500">
                  <a href="https://www.facebook.com/senditcourier">
                    <Image
                      src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/facebook-logo-removebg-preview_k2pief.png"
                      alt="facebook"
                      width={32}
                      height={32}
                    />
                  </a>
                  <a href="https://www.twitter.com/senditcourier">
                    <Image
                      src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/twitter-logo-removebg-preview_hc45pq.png"
                      alt="twitter"
                      width={32}
                      height={32}
                    />
                  </a>
                  <a href="https://www.instagram.com/senditcourier">
                    <Image
                      src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/instagram-logo-removebg-preview_jh0wxb.png"
                      alt="instagram"
                      width={32}
                      height={32}
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className=" ">
              <h6 className="mb-4 text-start font-extrabold text-blue-500 uppercase ">
                Company
              </h6>
              <p className="mb-4">
                <Link
                  prefetch={false}
                  href="/deliveries"
                  title="book a car of your choice"
                  className="text-neutral-600 hover:text-blue-500">
                  Send Parcel
                </Link>
              </p>
              <p className="mb-4">
                <Link
                  href="/pricing"
                  title="buy or sell a car"
                  className="text-neutral-600 hover:text-blue-500">
                  Pricing
                </Link>
              </p>
              <p className="mb-4">
                <Link
                  href="/pricing"
                  title="buy or sell a car"
                  className="text-neutral-600 hover:text-blue-500">
                  About Us
                </Link>
              </p>
              <p className="mb-4">
                <a
                  role="link"
                  aria-disabled="true"
                  title="book a car for a special event such as weddings etc"
                  className="text-neutral-600 hover:text-blue-500">
                  Become a partner
                </a>
              </p>
            </div>
            <div className="">
              <h6 className="mb-4 text-start font-extrabold text-blue-500 uppercase">
                Quick Links
              </h6>
              <p className="mb-4">
                <Link
                  href="/faq"
                  className="text-neutral-600 hover:text-blue-500">
                  FAQs
                </Link>
              </p>
              <p className="mb-4">
                <Link
                  href="/terms"
                  className="text-neutral-600 hover:text-blue-500">
                  Terms & Conditions
                </Link>
              </p>

              <p className="mb-4">
                <Link
                  href="/privacy"
                  className="text-neutral-600 hover:text-blue-500">
                  Privacy Policy
                </Link>
              </p>
              <p>
                <Link
                  href="/help"
                  className="text-neutral-600 hover:text-blue-500">
                  Help Center
                </Link>
              </p>
            </div>

            <div>
              <h6 className="mb-4  text-start font-extrabold uppercase  text-blue-500">
                Contact Us
              </h6>
              <p className="mb-4 flex items-center md:justify-start gap-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 text-blue-500">
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
                123 Kimathi Street, NRB.
              </p>
              <p className="mb-4 flex items-center  md:justify-start gap-2 cursor-pointer hover:text-blue-500">
                <MailIcon fill="none" className="text-blue-500" />
                <a href="mailto: support@senditcourier.com" target="_blank">
                  support@senditcourier.com
                </a>
              </p>
              <p className="mb-4 flex items-center md:justify-start gap-2 cursor-pointer hover:text-blue-500">
                <Phone fill="none" className="text-blue-500" />
                <a href="tel:+254 702018099" target="_blank">
                  +254702018099
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-muted text-muted-foreground py-1 text-center">
          <p>&copy; {new Date().getFullYear()} - Sendit Design by Donvine</p>
        </div>
      </div>
    </div>
  );
}
