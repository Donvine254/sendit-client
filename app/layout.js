import "./globals.css";

import ContextProvider from "@/context/context";
import { Toaster } from "react-hot-toast";
import { Navbar, Footer, ScrollIndicator } from "@/components";

export const metadata = {
  title: "Sendit",
  description:
    "Sendit is a courier delivery service provider that offers same day deliveries and unbeaten prices for all deliveries",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="luxury">
      <body>
        <ScrollIndicator />
        <ContextProvider>
          <Navbar />
          {children}
        </ContextProvider>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
