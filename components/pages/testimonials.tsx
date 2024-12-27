import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Sendit's efficient delivery service has revolutionized our e-commerce operations. Their reliability and speed are unmatched.",
    author: "Sarah Johnson",
    role: "Operations Manager, TechGadgets Inc.",
    stars: 5,
  },
  {
    quote:
      "Incredible team of professionals. Focused on timely deliveries and excellent customer service. A game-changer for our business.",
    author: "Michael Chen",
    role: "Logistics Director, FreshFoods Co.",
    stars: 5,
  },
  {
    quote:
      "Sendit's innovative approach to parcel delivery sets them apart. Their tracking system gives us peace of mind with every shipment.",
    author: "Emily Rodriguez",
    role: "CEO, Boutique Fashions",
    stars: 5,
  },
];

const stats = [
  { value: "50k+", label: "Parcels Delivered" },
  { value: "99.8%", label: "On-Time Delivery" },
  { value: "4.9", label: "Customer Rating" },
];

export default function Testimonials() {
  return (
    <section className="p-2 md:p-4 bg-[#F8F9FA]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-4">
          <p className="text-xl font-bold text-center text-blue-500 py-1 px-4 border bg-gray-200 w-fit">
            Testimonials
          </p>
          <h1 className="text-4xl font-bold text-center">
            What our customer&apos;s say
          </h1>
        </div>
        <div className="grid md:grid-cols-3 gap-8  border-b py-2 md:mb-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow border text-center">
              <p className="text-gray-600 mb-4">
                <q>{testimonial.quote}</q>
              </p>
              <div className="flex mb-2 justify-center">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {testimonial.author}
              </p>
              <p className="font-semibold text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 mx-auto text-center divide-x py-2 mt-2">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className=" text-2xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
