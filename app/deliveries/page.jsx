import React from "react";
import Map from "../../components/Map";
import Image from "next/image";
import Link from "next/link";
import {
  getKindeServerSession,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

export default function page() {
  const { isAuthenticated } = getKindeServerSession();
  return (
    <>
      {isAuthenticated() ? (
        <div className="lg:mx-auto m-2 p-5" >
          <h1 className="text-center my-2 font-bold text-2xl md:text-4xl">
            Create a Delivery Order
          </h1>
          <p className="text-xl my-2 ">
            Use our effortless delivery order to place an order, Sendit will
            handle the rest
          </p>
          <section className="">
            <Map />
          </section>
        </div>
      ) : (
        <div className="card py-4 xsm:w-full md:max-w-[400px] w-100px shadow-lg border border-blue-300 md:mx-auto mt-2">
          <div className="card-body items-center text-center">
            <figure className="px-10 pt-10">
              <Image
                src="https://static.vecteezy.com/system/resources/previews/004/996/790/original/robot-chatbot-icon-sign-free-vector.jpg"
                alt="robot"
                className=""
                height={100}
                width={400}
              />
            </figure>
            <h2 className="card-title text-red-500">Login Required</h2>
            <p>Kindly login to create a delivery order</p>
            <div className="card-actions justify-end gap-2">
              <LoginLink className="btn btn-neutral xsm:btn-sm xsm:mt-2 hover:bg-blue-600 hover:text-white " postLoginRedirectURL={'/deliveries'}>
                Sign in
              </LoginLink>
              <Link href="/" className="btn btn-warning xsm:btn-sm xsm:mt-2 hover:bg-red-400">Cancel</Link>
            </div>
          </div>
        </div>
      )}
      </>
  );
}

