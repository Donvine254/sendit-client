"use client";

import React from "react";
import Swal from "sweetalert2";
export default function page() {
  return (
    <div className="flex xsm:mx-2 items-center min-h-screen">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto xsm:my-1 my-1 lg:my-5 p-5 rounded-md">
          <div className="text-center">
            <h1 className="my-3 xsm:my-0 text-3xl font-semibold">Contact Us</h1>
            <p className="text-base">
              Fill up the form below to send us a message.
            </p>
          </div>
          <div className="m-2 shadow-2xl p-4 bg-base-100">
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              id="form">
              <input
                type="hidden"
                name="access_key"
                value="c0376663-dd70-4ab4-ba1b-e849ba57eecc"
              />
              <input
                type="hidden"
                name="subject"
                value="New Submission from Web3Forms"
              />
              <input
                type="hidden"
                name="redirect"
                value="http://localhost:3000"
              />
              <input type="checkbox" name="botcheck" id="" className="hidden" />
              <div className="mb-6">
                <label for="name" className="block mb-2 text-sm text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="John Doe"
                  required
                  className="input input-bordered input-primary w-full max-w-xs0"
                />
              </div>
              <div className="mb-6">
                <label for="email" className="block mb-2 text-sm text-gray-600">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@example.com"
                  required
                  className="input input-bordered input-secondary w-full max-w-xs0"
                />
              </div>
              <div className="mb-6">
                <label for="phone" className="text-sm text-gray-600 ">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="+254701234567"
                  className="input input-bordered input-secondary w-full max-w-xs0"
                />
              </div>
              <div className="mb-6">
                <label for="message" className="block mb-2 text-sm ">
                  Your Message
                </label>

                <textarea
                  rows="5"
                  name="message"
                  id="message"
                  placeholder="Your Message"
                  className="w-full textarea textarea-primary"
                  required></textarea>
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className="btn btn-outline btn-primary w-full"
                  onClick={() =>
                    Swal.fire({
                      icon: "success",
                      title: "Message sent successfully",
                      text: "Thank you! The form has been submitted successfully. We will reply to you soon!",
                      showCloseButton: true,
                      confirmButtonColor: "#0056F1",
                      timer: 3000,
                    })
                  }>
                  Send Message
                </button>
              </div>
              <p
                className="text-base text-center text-gray-400"
                id="result"></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
