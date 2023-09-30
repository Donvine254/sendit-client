import "./globals.css";
import { Inter } from "next/font/google";
import ContextProvider from "@/context/context";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components";


export const metadata = {
  title: "SendIT",
  description:
    "SendIT is a courier delivery service provider that offers same day deliveries and unbeaten prices for all deliveries",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="retro">
      <body>
        <ContextProvider>
          <Navbar/>
          {children}</ContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
