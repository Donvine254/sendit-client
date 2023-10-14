"use client";
import React from "react"
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Swal from "sweetalert2";
import Image from "next/image";
export default function page() {
  const environment = process.env.NODE_ENV;
  const redirectUrl =
    environment === "development"
      ? "http://localhost:3000"
      : "https://senditcourrier.vercel.app";
    function handleChange(){
      console.log("something is cooking")
    }
  function handleSubmit() {
    Swal.fire({
      icon: "success",
      title: "Message sent successfully",
      text: "Thank you! Your message has been submitted successfully. We will reply to you soon!",
      showCloseButton: true,
      confirmButtonColor: "#0056F1",
      timer: 3000,
    });
  }
  return (
    <div className="flex xsm:mx-2 items-center min-h-scree font-serif">
      <div className="container mx-auto">
        <h1 className="my-3 xsm:my-0 text-3xl font-semibold  py-2 text-center">
          Contact Us
        </h1>
        <h2 className="text-xl font-bold">
          You can reach us anyday, anytime through:
        </h2>
        <div className="flex flex-col md:flex-row justify-between bg-base-200 shadow-lg border p-3 xsm:py-4">
          <p className="flex items-center md:text-xl font-bold gap-1 my-1">
            📞 +254702018080
          </p>
          <a
            href="mailto:senditcourrier.gmail.com"
            className="flex items-center md:text-xl font-bold gap-1 my-1">
            📧 senditcourrier@gmail.com
          </a>
          <p className="flex items-center md:text-xl font-bold my-1">
            <Image src="./whatsapp.svg" height={30} width={30} alt="whatsapp-icon"></Image>
            +254702018080
          </p>
        </div>
        <div className="max-w-md mx-auto xsm:my-1 my-1 p-5 lg:my-3 rounded-md border border-primary shadow-2xl bg-base-100">
          <div className="text-center">
            <h2 className="text-xl font-bold">Need More information?</h2>
            <p className="mx-4 text-base text-start self-start">
              Fill up the form below to send us a message and we will get in
              touch as soon as possible.
            </p>
          </div>
          <div className="m-2 p-4  ">
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              id="form"
              onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="access_key"
                value="134e33ca-5eb3-4993-bd97-5a12f68fb77a"
              />
              <input type="hidden" name="redirect" value={redirectUrl} />
              <input
                type="hidden"
                name="subject"
                value="You have a new message at senditcourrier.com"></input>
              <input type="hidden" name="from_name" value="sendit"></input>
              <input type="checkbox" name="botcheck" id="" className="hidden" />
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm text-gray-600">
                  Full Name <span className="text-red-600 font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your names"
                  required
                  className="input input-bordered input-primary w-full max-w-xs0"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-600">
                  Email Address <span className="text-red-600 font-bold">*</span>
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
                <label htmlFor="phone" className="text-sm text-gray-600 ">
                  Phone Number <span >(optional)</span>
                </label>
                {/* <PhoneInput placeholder="Enter phone number"  defaultCountry="KE" onChange={handleChange}/> */}

                <input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="🇰🇪 701234567"
                  className="input input-bordered input-secondary w-full max-w-xs0"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 text-sm ">
                  Your Message <span className="text-red-600 font-bold">*</span>
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
                  className="btn btn-outline btn-primary w-full">
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
