"use client";
// import React, { useEffect, useState } from "react";
// import {IoPricetagSharp} from "react-icons/io5"
// import Link from "next/link";
// export default function MyOrders({ currentUser }) {
//   const [orders, setOrders] = useState([]);
//   useEffect(() => {
//     (async () => {
//       if (currentUser) {
//         const response = await fetch(
//           `https://sendit.up.railway.app/customer/${currentUser.id}/orders`
//         );
//         if (response.ok) {
//           const data = await response.json(); // Note: Use await here
//           console.log(data);
//           setOrders(data);
//         }
//       }
//     })();
//   }, []);

//   return (
//     <div className="w-full lg:mt-10 lg:w-1/2 lg:mx-auto p-2">
//       {orders && orders.length > 0 ? (
//         orders.map((order) => (
//           <div className="flex flex-col bg-base-200 p-4 rounded-lg border space-y-4 my-3 relative overflow-hidden">
//             <div className="font-semibold md:flex md:items-center md:gap-10"><span>Order ID: 000{order?.id}</span>
//             <p className="hidden md:block"> {order?.parcel.created_at_date}</p>
//             </div>
//             <ul className="steps steps-vertical">
//               <li className="step step-primary font-bold" data-content="">
//                 {order?.parcel?.pickup_address}
//               </li>
//               <li className="step  font-bold" data-content="">
//                 {order?.parcel?.delivery_address}
//               </li>
//             </ul>
//             <div className="text-base font-light leading-loose">
//               <span className="font-bold">Description: </span>
//               {order?.parcel?.description}
//             </div>
//             <div className="flex justify-between gap-5 items-center">
//               <div className="btn btn-outline btn-disabled flex items-center gap-1">
//               <IoPricetagSharp className="text-xl text-primary"/>
//                 <span className="font-bold text-primary"> Ksh {order?.price} </span>
//               </div>
//               <button className="btn btn-outline hover:btn-primary flex">
//                 View Details
//               </button>
//             </div>
//             {/* styling for a banner */}
//             <div className="absolute right-0 top-0 h-24 w-20 z-5">
//               <div className={`absolute transform rotate-45 ${order.status==="pending"? "bg-gray-600": "bg-primary"} ${order.status==="delivered"? "bg-green-600": ""} text-center text-white font-semibold py-1 right-[-34px] top-[32px] capitalize w-[200px]`}>
//                 {order?.status}
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="flex flex-col items-center justify-center py-2">
//           <p className="text-error font-bold py-2 flex items-center gap-2">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="stroke-current shrink-0 h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>

//             <span>You have no orders yet, let&apos;s fix that!</span>
//           </p>
//           <Link href="/deliveries" className="btn btn-primary">
//             Create New Order
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { IoPricetagSharp } from "react-icons/io5";
import Link from "next/link";

export default function MyOrders({ currentUser }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        const response = await fetch(
          `https://sendit.up.railway.app/customer/${currentUser.id}/orders`
        );
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
        setIsLoading(false);
      }
    })();
  }, [currentUser]);

  return (
    <div className="w-full lg:mt-10 lg:w-1/2 lg:mx-auto p-2">
      {isLoading ? (
        <progress className="progress progress-primary w-full"></progress>
      ) : (
        <>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <div className="flex flex-col bg-base-200 p-4 rounded-lg border space-y-4 my-3 relative overflow-hidden" key={order.id}>
                <div className="font-semibold md:flex md:items-center md:gap-10">
                  <span>Order ID: 000{order?.id}</span>
                  <p className="hidden md:block">
                    {" "}
                    {order?.parcel.created_at_date}
                  </p>
                </div>
                <ul className="steps steps-vertical">
                  <li className="step step-primary font-bold" data-content="">
                    {order?.parcel?.pickup_address}
                  </li>
                  <li className="step  font-bold" data-content="">
                    {order?.parcel?.delivery_address}
                  </li>
                </ul>
                <div className="text-base font-light leading-loose">
                  <span className="font-bold">Description: </span>
                  {order?.parcel?.description}
                </div>
                <div className="flex justify-between gap-5 items-center">
                  <div className="btn btn-outline btn-disabled flex items-center gap-1">
                    <IoPricetagSharp className="text-xl text-primary" />
                    <span className="font-bold text-primary">
                      {" "}
                      Ksh {order?.price}{" "}
                    </span>
                  </div>
                  <button className="btn btn-outline hover:btn-primary flex">
                    View Details
                  </button>
                </div>
                {/* styling for a banner */}
                <div className="absolute right-0 top-0 h-24 w-20 z-5">
                  <div
                    className={`absolute transform rotate-45 ${
                      order.status === "pending" ? "bg-gray-600" : "bg-primary"
                    } ${
                      order.status === "delivered" ? "bg-green-600" : ""
                    } text-center text-white font-semibold py-1 right-[-34px] top-[32px] capitalize w-[200px]`}>
                    {order?.status}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-2">
              <p className="text-error font-bold py-2 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <span>You have no orders yet, let&apos;s fix that!</span>
              </p>
              <Link href="/deliveries" className="btn btn-primary">
                Create New Order
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
