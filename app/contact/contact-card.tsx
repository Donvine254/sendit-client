import { Whatsapp } from "@/assets";
import { MailIcon, MapPin, Phone } from "lucide-react";

const contactMethods = [
  {
    icon: Whatsapp,
    title: "Chat to with us",
    description: "Speak to our friendly team.",
    contact: {
      text: "+254702018099",
      url: "https://api.whatsapp.com/send?phone=254702018099&text=Hello",
    },
  },
  {
    icon: MailIcon,
    title: "Send us an Email",
    description: "We're here to help.",
    contact: {
      text: "senditcourrier@gmail.com",
      url: "mailto:senditcourrier@gmail.com",
    },
  },
  {
    icon: MapPin,
    title: "Visit us",
    description: "Visit our office HQ.",
    contact: {
      text: "View on Google Maps",
      url: "https://maps.app.goo.gl/2mHysJdAvpx9WBQM6",
    },
  },
  {
    icon: Phone,
    title: "Call us",
    description: "Mon-Fri from 8am to 6pm.",
    contact: { text: "+254702018099", url: "tel:+254702018099" },
  },
];

export default function ContactCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {contactMethods.map((method, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow border">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <method.icon className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
          <p className="text-gray-600 mb-2">{method.description}</p>
          <a
            href={method.contact.url}
            className="mb-2 text-muted-foreground hover:text-blue-600 hover:underline">
            {method.contact.text}
          </a>
        </div>
      ))}
    </div>
  );
}
