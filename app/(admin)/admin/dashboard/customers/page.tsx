import { Metadata } from "next";
import React from "react";
import { getUsers } from "../../actions";

export const metadata: Metadata = {
  title: "Admin Dashboard | Sendit Kenya",
  description:
    "Sendit Courier provides courier delivery services that enables customers to send parcels from the comfort of their homes.",
};
interface User {
  id: string;
  email: string;
  username: string;
  full_name: string;
  last_name: string;
  first_name: string;
  is_suspended: boolean;
  created_on: string;
  picture?: string;
  total_sign_ins: number;
  last_signed_in: string;
}

export default async function CustomersPage() {
  const users = (await getUsers()) as User[];
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const monthlyActiveUsers = users.filter((user) => {
    const lastSignInDate = new Date(user.last_signed_in);
    return (
      lastSignInDate.getMonth() === currentMonth &&
      lastSignInDate.getFullYear() === currentYear
    );
  });
  return <section>page</section>;
}
