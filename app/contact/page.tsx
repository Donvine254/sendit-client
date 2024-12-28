import React from "react";
import ContactCards from "./contact-card";
import ContactForm from "./contact-form";

type Props = {};

export default function Contact({}: Props) {
  return (
    <section className="min-h-screen bg-[#f2f2f2]">
      <div className="flex items-center flex-col justify-center h-screen bg-grid-gray-100">
        <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize  text-blue-600 md:py-4">
          Contact Our Friendly Team
        </h1>
        <p className="text-lg font-extralight text-muted-foreground mb-2">
          Let us know how we can help.
        </p>
        <ContactCards />
      </div>
      <div className="flex gap-2 items-stretch">
        <ContactForm />
        <div className="bg-white p-6 rounded-lg shadow h-full">
          <h2 className="text-xl font-bold text-start my-2">We are here</h2>
          <p className="text-muted-foreground">Mon - Fri 08.00 - 18.00</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d21945.26448218205!2d36.8211599462821!3d-1.2831860371015893!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d67ee2d70b%3A0x2a9f5a7ddd13c4bd!2s123%20Kimathi%20St%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1735422999459!5m2!1sen!2ske"
            width="600"
            height="400"
            allowFullScreen
            className="border shadow h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </section>
  );
}
