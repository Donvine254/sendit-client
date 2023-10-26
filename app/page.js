import Image from "next/image";
import { Hero, HomeComponent } from "@/components";
import { IoLogoWhatsapp } from "react-icons/io";
import Link from "next/link";
import "./contact/contact.css";
export default function Home() {
  return (
    <>
      <Hero />
      <div className="divider divide-dotted"></div>
      <HomeComponent />
      <Link href="" className="fixed bottom-5 right-5 z-50 w-[60px] h-[60px] rounded-full bg-green-500 flex items-center justify-center shadow-md whatsapp-btn">
        {" "}
        <IoLogoWhatsapp className="i !text-white fill-white text-[32px] icony cursor-pointer" />
      </Link>
    </>
  );
}
