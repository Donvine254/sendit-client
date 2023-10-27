"use client";
import React from "react";
import Swal from "sweetalert2";
import Image from "next/image";

export default function Page() {
  const environment = process.env.NODE_ENV;
  const redirectUrl =
    environment === "development"
      ? "http://localhost:3000"
      : "https://senditcourrier.vercel.app";
  function handleChange() {
    console.log("something is cooking");
  }
  function handleSubmit() {
    Swal.fire({
      icon: "success",
      title: "Your application has been submitted successfully",
      text: "Thank you! Your Application has been submitted successfully. We will reply to you soon!",
      showCloseButton: true,
      confirmButtonColor: "#0056F1",
      timer: 3000,
    });
  }
  return (
    <div className="px-5 lg:grid lg:grid-cols-2 gap-10 min-h-screen">
      {/* benefits card */}
      <div className="my-1 lg:my-5 mt-5 lg:pl-10 max-w-xl rounded-md mx-auto">
        <h1 className="text-3xl font-semibold text-center">
          Benefits of becoming a rider with our company
        </h1>
        <h2 className="text-2xl font-semibold mt-6">Flexible work schedule</h2>
        <p className="text-gray-600 text-lg mt-4">
          Work when it suits you, whether it is part-time or full-time
        </p>
        <h2 className="text-2xl font-semibold mt-6">
          Competitive compensation
        </h2>
        <p className="text-gray-600 text-lg mt-4">
          Earn a competitive income for each delivery you make
        </p>
        <h2 className="text-2xl font-semibold mt-6">Supportive community</h2>
        <p className="text-gray-600 text-lg mt-4">
          Join a community of fellow riders and receive support and guidance.
        </p>
        <h2 className="text-2xl font-semibold mt-6">
          Opportunities for growth
        </h2>
        <p className="text-gray-600 text-lg mt-4">
          Explore career advancement and opportunities for personal development.
        </p>
        <h2 className="text-2xl font-semibold mt-6">Safety measures</h2>
        <p className="text-gray-600 text-lg mt-4">
          We prioritize your safety and provide training on safe riding
          practices.
        </p>
        <h2 className="text-2xl font-semibold mt-6">Modern technology</h2>
        <p className="text-gray-600 text-lg mt-4">
          Access to advanced delivery tools and technology for efficiency.
        </p>
      </div>
      {/* card for form */}
      <div className="my-1 lg:my-5 mt-5 max-w-xl mx-auto">
        <div className="text-center">
          <h1 className="my-3 xsm:my-0 text-3xl font-semibold">
            Rider Details
          </h1>
          <p className="mx-4 text-base text-start self-start">
            Fill up the form below to provide your rider details.
          </p>
        </div>

        <div className="m-2 shadow-2xl p-4 bg-base-100">
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
              value="Rider Details Submission at senditcourrier.com"></input>
            <input type="hidden" name="from_name" value="example"></input>
            <input type="checkbox" name="botcheck" id="" className="hidden" />
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm text-gray-600">
                Rider Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter rider's name"
                required
                className="input input-bordered input-primary w-full max-w-xs0"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="phone Number"
                className="block mb-2 text-sm text-gray-600">
                Rider Phone Number
              </label>
              <input
                type="number"
                name="phone Number"
                id="number"
                placeholder="+254701234567"
                className="input input-bordered input-secondary w-full max-w-xs0"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="ID Number"
                className="block mb-2 text-sm text-gray-600">
                Rider ID Number
              </label>
              <input
                type="text"
                name="ID Number"
                id="idNumber"
                placeholder="Enter rider's ID number"
                required
                className="input input-bordered input-secondary w-full max-w-xs0"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="license Plate"
                className="block mb-2 text-sm text-gray-600">
                Rider License Plate
              </label>
              <input
                type="text"
                name="license Plate"
                id="licensePlate"
                placeholder="Enter rider's license plate"
                required
                className="input input-bordered input-secondary w-full max-w-xs0"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="driving License Number"
                className="block mb-2 text-sm text-gray-600">
                Rider Driving License Number
              </label>
              <input
                type="text"
                name="driving License Number"
                id="drivingLicenseNumber"
                placeholder="Enter rider's driving license number"
                required
                className="input input-bordered input-secondary w-full max-w-xs0"
              />
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="btn btn-outline btn-primary w-full">
                Submit Rider Details
              </button>
            </div>
            <p className="text-base text-center text-gray-400" id="result"></p>
          </form>
        </div>
      </div>
    </div>
  );
}
