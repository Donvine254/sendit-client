import React from "react";

import Link from "next/link";

export default function page({ params }) {
  const pages = ["partners", "pricing", "quote", "careers","terms","about","privacy"];
  const isUnderDevelopment = pages.some((page) =>
    params["not-found"].includes(page)
  );

  return (
    <>
      {isUnderDevelopment ? (
        <div className="mt-1 xsm:h-fit md:h-[400px] ">
          <h1 className="text-2xl font-bold text-center my-2 font-mono">
            {" "}
            👷 Coming Soon 🚧🚧
          </h1>
          <div className="alert alert-info mx-4 xsm:w-fit w-5/6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6">
              <path
               strokeLinecap="round"
               strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>
              This page is currently under construction 🚧. Stay tuned in for
              more information.
            </span>
          </div>
        </div>
      ) : (
        <div className="p-2 ">
          <h1 className="font-bold text-6xl text-center font-mono lg:text-8xl ">404</h1>
          <div className="bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] bg-auto bg-center h-[400px] mt-5"></div>
            <h3 className="text-center text-2xl font-bold">Oh No! Looks like you&#39;re lost </h3>

            <p className="text-xl text-center p-2 my-1">You must have picked the wrong door because i have not been able to lay an eye on the page you are searching for! 😢</p>
            <div className="flex items-center justify-center my-2"> <Link href="/" className="btn accent hover:btn-neutral text-white ">
              Take me Back!
            </Link></div>
           
        </div>
      )}
    </>
  );
}
