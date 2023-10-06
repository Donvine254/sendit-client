"use client";
import React from "react";
import { sendEmail } from "@/lib/mailer";
import toast from "react-hot-toast";

export default function page() {
  const data = {
    subject: "Order confirmation",
    message:
      "Hello there, this is just to let you know that your order has been confirmed. Our rider in the area will contact you for pickup instructions as  soon as possible",
    email: "tutorassignment123@gmail.com",
  };
  function handleClick(){
    toast.success("order placed successfully")
    sendEmail(data)
  }
  return (
    <div className="bg-base h-[480px]">
      <button
        type="button"
        className="btn btn-primary mx-5 my-5"
        onClick={handleClick}>
        Create a new order
      </button>
    </div>
  );
}
