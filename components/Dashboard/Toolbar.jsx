import React from "react";

export default function Toolbar({ role, active, setActive }) {
  const handleClick = (item) => {
    setActive(item);
  };
  return (
    <>
      <ul className="w-full flex ul-with-scrollbar gap-5 md:justify-between lg:mx-auto lg:w-1/2 my-2">
        {menuItems[role].map((item) => (
          <li
            key={item.text}
            className={`toolbar-link ${item.text === active ? "underline md:underline-offset-8 decoration-primary md:decoration-4 text-primary" : ""}`}
            onClick={() => handleClick(item.text)}>
            {item.text}
          </li>
        ))}
      </ul>
    </>
  );
}

const menuItems = {
  admin: [
    { text: "Orders" },
    { text: "Riders" },
    { text: "Customers" },
    { text: "Analytics" },
    { text: "Settings" },
  ],
  user: [
    { text: "My Orders" },
    { text: "Send Parcel" },
    { text: "Help Center" },
    { text: "Settings" },
  ],
  rider: [
    { text: "My Deliveries" },
    { text: "Get Orders" },
    { text: "Earnings" },
    { text: "Help Center" },
    { text: "Settings" }
  ],
};
