import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <section>
      <main>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 lg:hidden bg-gradient-to-br from-blue-600 to-blue-800"></div>
          <div className="absolute inset-0 hidden lg:block">
            <Image
              fill
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1615461469775-9d244476325f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
              alt="Courier delivery"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>

          <div className="max-w-7xl mx-auto relative">
            <div className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                  <div className="sm:text-center lg:text-left lg:col-span-7">
                    <h1 className="text-5xl tracking-tight font-extrabold text-white sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl">
                      <span className="block leading-tight">Fast &</span>
                      <span className="block leading-tight">Reliable</span>
                      <span className="block text-blue-200 leading-tight">
                        Courier Services
                      </span>
                    </h1>
                    <p className="mt-3 text-base text-blue-100 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Send your parcels with confidence. We pick up from your
                      location and deliver to any destination. Quick, secure,
                      and hassle-free shipping solutions for all your needs.
                    </p>
                    <div className="mt-8 flex gap-4 lg:justify-start sm:space-x-4 space-y-4 sm:space-y-0">
                      <a
                        href="#"
                        className="w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:text-lg md:px-10">
                        Send Parcel
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </a>
                      <a
                        href="#"
                        className="w-full sm:w-auto flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 md:text-lg md:px-10">
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
