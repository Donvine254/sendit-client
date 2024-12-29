import React from "react";
import QuoteForm from "./quote-form";

type Props = {};

export default function page({}: Props) {
  return (
    <section className="min-h-screen bg-grid-gray-100">
      <div className="bg-[url('https://res.cloudinary.com/dipkbpinx/image/upload/v1735350473/illustrations/woqbj1kwbaszfwovpbh1.webp')] bg-cover bg-center bg-no-repeat pt-10">
        <div className="bg-black flex flex-col items-center justify-center  bg-opacity-60 px-6 py-10 md:py-20 ">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize  text-white md:py-4 ">
            Get a Quote
          </h1>
          <p className="text-lg font-extralight text-muted-foreground mb-2">
            If you have a special request, fill the form below and we will get
            back to you.
          </p>
        </div>
      </div>
      <main className="bg-[#f2f2f2] bg-opacity-70">
        <QuoteForm />
      </main>
    </section>
  );
}
