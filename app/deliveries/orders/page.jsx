"use client";
import React from "react";
import { useRouter } from 'next/navigation'
import { useAppContext } from "@/context/context";
import { VscLocation } from "react-icons/vsc";
import { updateUserDetails, createOrder } from "@/lib";
import Loading from "../../../components/loading";

export default function OrderPage() {
  const { orderData, createdParcel, currentUser, phone_number } = useAppContext();
  const router= useRouter()
 
  function handleClick() {
    updateUserDetails(currentUser, phone_number)
    createOrder(orderData, router)
  }
  return (
    <section className="w-full">
      <h1 className="my-2 font-bold text-2xl md:text-3xl text-center">
        Checkout
      </h1>
      <ul className="steps w-full">
        <li data-content="✓" className="step step-primary"></li>
        <li data-content="✓" className="step step-primary"></li>
        <li data-content="✓" className="step step-primary"></li>
        <li data-content="✓" className="step step-primary"></li>
      </ul>
      {createdParcel ? (
        <>
          {" "}
          <div className="mx-auto flex flex-col lg:flex-row gap-5 lg:gap-0 justify-evenly p-4">
            {/* first card */}
            <div className="border bg-base-200 shadow-lg lg:w-1/2 lg:mx-5 h-fit min-h-[350px]">
              <div className="p-4">
                <h1 className="text-xl font-bold flex items-center gap-2">
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
                  Pickup Information
                </h1>
                <p className="flex items-center gap-2 text-xl">
                  <VscLocation /> {createdParcel?.pickup_address}
                </p>
              </div>

              <div className="divider"></div>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead></thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>📦 What are you sending?</th>
                      <td>{createdParcel.description}</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <th>⚖️ Weight</th>
                      <td>{createdParcel.weight} kgs</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <th>🧑🏾‍🦱 Contact Person</th>
                      <td>{currentUser?.phone_number ?? phone_number}</td>
                    </tr>
                    {/* row 4 */}
                    <tr>
                      <th>✍🏾 Pickup Notes</th>
                      <td>Call John to open the gate.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* second card */}
            <div className="border bg-base-200 shadow-lg lg:w-1/2 lg:mx-5 h-fit min-h-[350px] ">
              <div className="p-4">
                <h1 className="text-xl font-bold flex items-center gap-2">
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
                  Delivery Information
                </h1>
                <p className="flex items-center gap-2 text-xl">
                  <VscLocation /> {createdParcel?.delivery_address}
                </p>
              </div>

              <div className="divider"></div>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead></thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>🧑🏾‍🦱 Receiver Name</th>
                      <td>{createdParcel?.receiver_name}</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <th>📞 Receiver Contact</th>
                      <td>{createdParcel?.receiver_contact}</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <th>✍🏾 Delivery Notes</th>
                      <td>
                        John is working so alert him when you are near the
                        location.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="bg-base-200 p-4 text-start md:my-4 mx-4 lg:mx-7">
            <div className="flex items-center justify-between">
              <p className="text-xl font-light">Price:</p>
              <p className="font-bold">Ksh {(orderData.price / 1.16).toFixed(2)} </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xl font-light">VAT:</p>
              <p className="font-bold">Ksh {((orderData.price / 1.16) * 0.16).toFixed(2)} </p>
            </div>

            <div className="flex items-center justify-between font-bold my-1 text-xl">
              <p>Total Price:</p>
              <p>Ksh {orderData.price} </p>
            </div>
            <div className="divider"></div>
            <div className="flex items-center justify-between">
              <p className="text-xl font-light">Estimated Delivery Date:</p>
              <p className="font-bold">21/10/2023 </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="button"
              className="btn btn-outline hero-btn"
              onClick={handleClick}>
              Place Order
            </button>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
}
