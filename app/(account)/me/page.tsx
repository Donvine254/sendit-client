import React from "react";
import { redirect } from "next/navigation";

type Props = {};

export default async function Profile({}: Props) {
  return redirect("/me/profile");
}
