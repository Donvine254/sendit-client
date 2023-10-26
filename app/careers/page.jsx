"use client";
import React from "react";
import Swal from "sweetalert2";
import Image from "next/image";

export default function Page() {
  function handleEmailClick() {
    Swal.fire({
      icon: "info",
      title: "Submit Your Resume",
      html: "Please send your resume to <a href='mailto:senditcourriera@gmail.com' class='text-blue-500'>senditcourrier@gmail.com</a> to express your interest in joining our team.",
      showCloseButton: true,
      confirmButtonColor: "#0056F1",
    });
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="container w-full h-full mx-auto">
        <div className="max-w-md mx-auto my-1 p-5 rounded-md">
          <div className="text-center">
            <h1 className="text-3xl font-semibold">Careers</h1>
            <Image
              src="https://res.cloudinary.com/dipkbpinx/image/upload/v1698312012/join-our-team_g4mo0m.jpg"
              alt="Join Our Team"
              width={640}
              height={360}
              className="h-fit w-fit"
            />

            <p className="mx-4 text-base text-start self-start">
              Currently, there are no open positions, but we are always
              interested in talented individuals. Please submit your resume to
              express your interest in joining our team.
            </p>
          </div>
          <div className="m-2 shadow-2xl p-4 bg-base-100">
            <button
              onClick={handleEmailClick}
              className="btn btn-outline btn-primary w-full">
              Send Your Resume via Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
