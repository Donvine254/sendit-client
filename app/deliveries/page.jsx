import React from "react";
import Map from "../../components/Map";
import Image from "next/image";
import Link from "next/link";
import { OrderDetails } from "@/components/steps";
import  PickupDetails from "../../components/steps/PickupDetails"
import {
  getKindeServerSession,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

export default function page() {
  const { isAuthenticated } = getKindeServerSession();
  return (
    <>
      {isAuthenticated() ? (
        <div className="lg:mx-auto m-2 p-5">
          <h1 className="text-center my-2 font-bold text-2xl md:text-3xl">
            Create a Delivery Order
          </h1>
          <section >
            <ul className="steps w-full">
              <li data-content="✓" className="step step-primary">
              </li>
              <li data-content="✕" className="step step-ghost">
              </li>
              <li data-content="✕" className="step step-ghost">
              </li>
              <li data-content="✕" className="step step-ghost">
              </li>
            </ul>
            {/* <OrderDetails /> */}
            <PickupDetails/>
            <div className="flex items-center justify-between lg:w-1/2 mx-auto">
              <button className="btn btn-neutral">Back</button>
              <button className="btn btn-primary">Next</button>
            </div>
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
              <LoginLink
                className="btn btn-neutral xsm:btn-sm xsm:mt-2 hover:bg-blue-600 hover:text-white "
                postLoginRedirectURL={"/deliveries"}>
                Sign in
              </LoginLink>
              <Link
                href="/"
                className="btn btn-warning xsm:btn-sm xsm:mt-2 hover:bg-red-400">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
