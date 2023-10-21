"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import { useAppContext } from "@/context/context";
import { VscLocation } from "react-icons/vsc";
import { updateUserDetails, createOrder } from "@/lib";
import {calculateEstimatedDeliveryDate} from "@/lib/calculatePrice"
import Loading from "../../../components/loading";
import { ErrorList } from "@/components/DeliveryPage";

export default function OrderPage() {
  const { orderData, createdParcel, currentUser, phone_number } = useAppContext();
 const [errors, setErrors]=useState();
  const router= useRouter()
 
  function handleClick() {
    updateUserDetails(currentUser, phone_number)
    createOrder(orderData, router, setErrors)
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
            <div className="border bg-base-200 shadow-lg lg:w-1/2 lg:mx-5 h-fit min-h-[300px] delivery-card relative group">
              <div className="p-4">
                <h1 className="text-xl font-bold flex items-center gap-2 mb-1 text-primary group-hover:text-white">
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
              <hr></hr>
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
                      <td>{createdParcel?.pickup_notes ?? "None"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* second card */}
            <div className="border bg-base-200 shadow-lg lg:w-1/2 lg:mx-5 h-fit min-h-[300px] delivery-card relative group ">
              <div className="p-4">
                <h1 className="text-xl font-bold flex items-center gap-2 mb-1 text-green-700 group-hover:text-green-300">
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

              <hr></hr>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead></thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th>🧑🏾‍🦱 Receiver Name</th>
                      <td className="capitalize">{createdParcel?.receiver_name}</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <th>📞 Receiver Contact</th>
                      <td>{createdParcel?.receiver_contact}</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <th>✍🏾 Delivery Notes</th>
                      <td contentEditable="false">
                      {createdParcel?.delivery_notes ?? "None"}
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
              <p className="font-bold">{calculateEstimatedDeliveryDate(orderData.duration) ?? ""} </p>
            </div>
          </div>
          {errors && <ErrorList errors={errors} />}
          <div className="flex items-center justify-center my-2">
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
