import React from "react";
import Image from "next/image";

export default function Page() {
  return (
    
    <div className="min-h-screen p-4">
      <div className="relative w-1/2 h-auto mx-auto">
             <Image
                src="https://res.cloudinary.com/dipkbpinx/image/upload/v1698312818/About-us_kfjwsq.svg"
                alt="about-us"
                width={6640}
                height={230}
                layout="responsive"
             />
            </div>
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold text-center mt-8">About Us</h1>
        <p className="text-gray-600 text-lg mt-4">
          Welcome to SendIt, your trusted partner for fast, secure, and reliable delivery services. We are here to help you connect with the world by ensuring that your packages reach their destination swiftly and safely.
        </p>
        <h2 className="text-2xl font-semibold mt-6">Our Story</h2>
        <p className="text-gray-600 text-lg mt-4">
          SendIt was founded with a simple yet powerful mission: to revolutionize the way packages are delivered. We understand the importance of speed, reliability, and trust when it comes to handling your valuable goods, and we have made it our mission to exceed your expectations.
        </p>
        <h2 className="text-2xl font-semibold mt-6">What Sets Us Apart</h2>
        <p className="text-gray-600 text-lg mt-4">
          At SendIt , we pride ourselves on being more than just a delivery service. We are your partners in success. Here is what sets us apart:
        </p>
        <ul className="list-disc pl-6 mt-3 text-gray-600">
          <li>Reliability: We ensure your packages reach their destination on schedule, every time.</li>
          <li>Security: Our state-of-the-art tracking systems and secure packaging guarantee the safety of your shipments.</li>
          <li>Customer-Centric Approach: Our customer service team is here to assist you 24/7.</li>
          <li>Sustainability: We are committed to reducing our carbon footprint with eco-friendly packaging and energy-efficient delivery methods.</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6">Our Team</h2>
        <p className="text-gray-600 text-lg mt-4">
          Behind every successful delivery is a team of dedicated professionals. At SendIt , our team is our strength. We are a diverse group of experts, from logistics wizards to customer service champions. We work together to ensure your packages are in safe hands.
        </p>

      </div>
        
    </div>
  );
}