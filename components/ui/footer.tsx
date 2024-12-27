import React from "react";
import Link from "next/link";
import { Clock, MailIcon, MapPinnedIcon, Package, Phone } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <div>
      <div className="bg-[#f8f9fa] border bg-opacity-80 text-neutral-600  ">
        <div className="mx-6 py-4 ">
          <div className="grid grid-1 gap-2 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="">
              <Link href="/" className="flex items-center gap-1">
                <Package className="h-8 w-8 " />
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
                <div className="flex items-center gap-4 py-2 text-green-500">
                  <a href="https://www.facebook.com/carhub">
                    <Image
                      src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/facebook-logo-removebg-preview_k2pief.png"
                      alt="facebook"
                      width={48}
                      height={48}
                    />
                  </a>
                  <a href="https://www.twitter.com/carhub">
                    <Image
                      src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/twitter-logo-removebg-preview_hc45pq.png"
                      alt="twitter"
                      width={48}
                      height={48}
                    />
                  </a>
                  <a href="https://www.instagram.com/carhub">
                    <Image
                      src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/instagram-logo-removebg-preview_jh0wxb.png"
                      alt="instagram"
                      width={48}
                      height={48}
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className=" ">
              <h6 className="mb-4 text-center font-extrabold text-green-500 uppercase md:text-start">
                Services
              </h6>
              <p className="mb-4">
                <a
                  href="/cars"
                  title="book a car of your choice"
                  className="text-neutral-600 hover:text-green-500">
                  Car Rental
                </a>
              </p>
              <p className="mb-4">
                <Link
                  href="/marketplace"
                  title="buy or sell a car"
                  className="text-neutral-600 hover:text-green-500">
                  Car Marketplace
                </Link>
                <span className="px-0.5 ml-0.5 bg-green-500 text-white rounded-sm text-xs">
                  New
                </span>
              </p>
              <p className="mb-4">
                <a
                  role="link"
                  aria-disabled="true"
                  title="book a car for a special event such as weddings etc"
                  className="text-neutral-600 hover:text-green-500">
                  Special Events
                </a>
              </p>
              <p className="mb-4">
                <a
                  role="link"
                  aria-disabled="true"
                  title="book a car together with a driver!"
                  className="text-neutral-600 hover:text-green-500">
                  Tour Guide
                </a>{" "}
              </p>
            </div>
            <div className="">
              <h6 className="mb-4 text-center font-extrabold text-green-500 uppercase md:text-start">
                Quick Links
              </h6>
              <p className="mb-4">
                <a
                  href="/faqs"
                  className="text-neutral-600 hover:text-green-500">
                  FAQs
                </a>
              </p>
              <p className="mb-4">
                <a
                  href="/terms"
                  className="text-neutral-600 hover:text-green-500">
                  Terms & Conditions
                </a>
              </p>

              <p className="mb-4">
                <a
                  href="/privacy"
                  className="text-neutral-600 hover:text-green-500">
                  Privacy Policy
                </a>
              </p>
              <p>
                <a
                  href="/help"
                  className="text-neutral-600 hover:text-green-500">
                  Help Center
                </a>
              </p>
            </div>

            <div>
              <h6 className="mb-4  text-center font-extrabold uppercase md:text-start text-green-500">
                Contact Us
              </h6>
              <p className="mb-4 flex items-center md:justify-start gap-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 text-green-500">
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
                123 Kimathi Street, NRB.
              </p>
              <p className="mb-4 flex items-center  md:justify-start gap-2 cursor-pointer hover:text-green-500">
                <MailIcon fill="none" className="text-green-500" />
                <a href="mailto:admin@carhub.com" target="_blank">
                  info@carhubke.com
                </a>
              </p>
              <p className="mb-4 flex items-center md:justify-start gap-2 cursor-pointer hover:text-green-500">
                <Phone fill="none" className="text-green-500" />
                <a href="tel:+254 702018099" target="_blank">
                  +254702018099
                </a>
              </p>
              <p className="mb-4 flex items-center md:justify-start gap-2 cursor-pointer hover:text-green-500">
                <svg
                  viewBox="0 0 1024 1024"
                  height="24"
                  fill="currentColor"
                  className="text-green-500"
                  width="24">
                  <path d="M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7-3.8-21.3-19.5-29.6-32.9-30.2-15.8-.7-29.9 8.3-33.4 21.4-6.6 24-.7 56.8 10.1 98.6-13.6 32.4-35.3 79.5-51.2 107.5-29.6 15.3-69.3 38.9-75.2 68.7-1.2 5.5.2 12.5 3.5 18.8 3.7 7 9.6 12.4 16.5 15 3 1.1 6.6 2 10.8 2 17.6 0 46.1-14.2 84.1-79.4 5.8-1.9 11.8-3.9 17.6-5.9 27.2-9.2 55.4-18.8 80.9-23.1 28.2 15.1 60.3 24.8 82.1 24.8 21.6 0 30.1-12.8 33.3-20.5 5.6-13.5 2.9-30.5-6.2-39.6-13.2-13-45.3-16.4-95.3-10.2-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7 6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4-4.9-19.9-5.6-48.1-2.7-51.4.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2-21.6 4.9-41.3 13-58.9 20.2-4.2 1.7-8.3 3.4-12.3 5 13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6 40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" />
                </svg>
                <a href="/logo.svg" download>
                  Download Brochure
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-neutral-200 py-1 text-center dark:bg-neutral-700">
          <p>&copy; {new Date().getFullYear()} - SENDIT Design by Donvine</p>
        </div>
      </div>
    </div>
  );
}
