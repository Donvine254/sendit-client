import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function Profile() {
  return redirect("/admin/dashboard");
}
