import React, { useState, useEffect } from "react";

export default function RiderEarnings({ currentUser }) {
  const [revenue, setRevenue] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      if (currentUser) {
        const response = await fetch(
          `https://sendit.up.railway.app/rider/${currentUser.id}/revenue`
        );
        if (response.ok) {
          const data = await response.json();
          setRevenue(data);
        }
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="w-full lg:mt-5 lg:w-2/3 lg:mx-auto p-2">
      {isLoading ? (
        <div className="md:flex items-center justify-center">
          <progress className="progress progress-primary w-full md:w-1/2"></progress>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl text-center font-bold">Earnings Summary</h1>
          <div className="py-3 flex flex-col gap-10">
            <div className="stats bg-[#e5f6f6]  border w-full shadow-lg">
              <div className="stat my-3 mr-2.5 ">
                <div className="font-bold text-xl ">Total Revenue</div>
                <div className="stat-value">Ksh {revenue?.total_revenue}</div>
                <div className="text-[12px]">↗︎ 1% from yesterday</div>
              </div>
            </div>
            <div className="stats bg-base-200 border shadow-lg  w-full ">
              <div className="stat my-3 mr-2.5 ">
                <div className="font-bold text-xl ">Delivery Count</div>
                <div className="stat-value">50 completed</div>
                <div className="text-[12px]">↗︎ 8% from last month</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
