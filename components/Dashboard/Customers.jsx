"use client";
import React, { useState, useEffect } from "react";

export default function Customers() {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sendit.up.railway.app/company/customers")
      .then((response) => response.json())
      .then((data) => {
        setCustomerData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customer data: ", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card w-full max-w-screen-xl mx-auto bg-base-100 shadow-xl p-4 md:p-8">
      <div className="card-body">
        <h2 className="card-title text-2xl">Customers List</h2>
        <div className="w-full mt-6">
          {loading ? (
            <div className="md:flex items-center justify-center">
              <progress className="progress progress-primary w-full md:w-1/2"></progress>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full bg-white rounded-md">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Phone Number</th>
                    <th className="px-4 py-2"> Date Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {customerData.map((customer) => (
                    <tr key={customer.id}>
                      <td className="border px-4 py-2">{customer.name}</td>
                      <td className="border px-4 py-2">{customer.email}</td>
                      <td className="border px-4 py-2">
                        {customer.phone_number ? customer.phone_number : "N/A"}
                      </td>
                      <td className="border px-4 py-2">{customer.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
