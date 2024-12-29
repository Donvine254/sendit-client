import Link from "next/link";
import React from "react";
import Image from "next/image";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
type Props = {};
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ChevronDown } from "lucide-react";
export default function Navbar({}: Props) {
  const { user } = useKindeBrowserClient();

  return (
    <div className="flex flex-wrap items-center justify-between  px-4 w-full">
      <Link href="/" className="flex items-center gap-1 text-blue-600">
        <Image
          src="https://res.cloudinary.com/dipkbpinx/image/upload/v1735352741/illustrations/by2cal2orce7rmqsceqi.svg"
          height={32}
          width={32}
          alt="logo"
          priority
          className="h-8 w-8 "
        />
        <h2 className="text-xl font-extrabold uppercase">Sendit</h2>
      </Link>
      <button
        data-collapse-toggle="mobile-menu"
        type="button"
        className="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none rounded-lg inline-flex items-center justify-center"
        aria-controls="mobile-menu-2"
        aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        {user && user.picture ? (
          <>
            <Image
              src={user.picture}
              width={32}
              height={32}
              alt="avatar"
              title="open menu"
              className="w-8 h-8 rounded-full focus:outline-none focus-within:outline-none"
            />
            <ChevronDown className="h-5 w-5" />
          </>
        ) : (
          <>
            {" "}
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
            </svg>
          </>
        )}
      </button>
      <div className="hidden md:block w-full md:w-auto " id="mobile-menu">
        <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-lg md:font-medium ">
          <li>
            <Link
              href="/"
              className=" hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2  hover:underline underline-offset-2 md:p-0">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/deliveries"
              className=" hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2  hover:underline underline-offset-2 md:p-0">
              Send Parcel
            </Link>
          </li>
          {/* dropdown for resources */}
          <li>
            <button
              id="dropdownNavbarLink"
              data-dropdown-toggle="dropdownNavbar3"
              className=" hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2  md:p-0 font-medium flex items-center justify-between w-full md:w-auto hover:underline underline-offset-2">
              Resources{" "}
              <svg
                className="w-4 h-4 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
            {/* Dropdown menu  */}
            <div
              id="dropdownNavbar3"
              className="hidden bg-white text-base z-10 list-none divide-y divide-gray-200 rounded shadow my-4 w-[84%] md:w-44">
              <ul className="py-1" aria-labelledby="dropdownLargeButton">
                <li>
                  <Link
                    href="/help"
                    className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/quote"
                    className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                    Get a Quote
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                    Contact
                  </Link>
                </li>
              </ul>
              <div className="py-1">
                <Link
                  href="/faq"
                  className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                  FAQs
                </Link>
              </div>
            </div>
          </li>

          {/* dropdown for account */}
          <li className={`${!user ? "hidden" : "block"}`}>
            <button
              id="dropdownNavbarLink"
              data-dropdown-toggle="dropdownNavbar"
              className=" hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2  md:p-0 font-medium flex items-center justify-between w-full md:w-auto hover:underline underline-offset-2">
              {user && (
                <Image
                  src={
                    user?.picture ||
                    "https://res.cloudinary.com/dipkbpinx/image/upload/v1734556978/carhub/avatars/paqrtcgyypq1qelyzrwj.png"
                  }
                  width={32}
                  height={32}
                  alt="avatar"
                  title="open menu"
                  className="hidden md:block w-8 h-8 rounded-full focus:outline-none focus-within:outline-none"
                />
              )}
              <span className="md:hidden">My Account</span>
              <svg
                className="w-4 h-4 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
            {/* Dropdown menu  */}
            <div
              id="dropdownNavbar"
              className="hidden bg-white text-base z-10 list-none divide-y divide-gray-200 rounded shadow my-4 w-[84%] md:w-44">
              <ul className="py-1" aria-labelledby="dropdownLargeButton">
                <li>
                  <a
                    href="/me/profile"
                    className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                    My Profile
                  </a>
                </li>
                <li>
                  <a
                    href="/me/orders"
                    className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                    My Deliveries
                  </a>
                </li>
                <li>
                  <a
                    href="/me/settings"
                    className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                    Settings
                  </a>
                </li>
                <li>
                  <LogoutLink className="text-sm hover:bg-destructive hover:text-destructive-foreground text-gray-700 block px-4 py-2">
                    Logout
                  </LogoutLink>
                </li>
              </ul>
            </div>
          </li>
          <li className={`${!user ? "flex" : "hidden"}`}>
            <LoginLink className="text-gray-700 hover:bg-gray-50 xsm:border-b  md:hover:bg-blue-600 md:hover:shadow  md:bg-blue-500 block pl-3 pr-4 py-2 md:hover:text-white md:py-0 md:px-4 items-center md:text-white md:text-center md:rounded-md md:h-8">
              Login
            </LoginLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
