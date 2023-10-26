"use client";
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/context";
import Loading from "../../components/loading";
import {
  Toolbar,
  Userdashboard,
  Settings,
  Riderdashboard,
  Admindashbaord,
} from "@/components/Dashboard";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { currentUser } = useAppContext();
  const [active, setActive] = useState("Settings");
  //redirect to the active pages
  const router = useRouter();
  if (active === "Help Center") {
    router.push("/contact");
  } else if (active === "Send Parcel") {
    router.push("/deliveries");
  }
  useEffect(() => {
    if (currentUser?.role === "user") {
      setActive("My Orders");
    } else if (currentUser?.role === "admin") {
      setActive("Orders");
    } else if (currentUser?.role === "rider") {
      setActive("My Deliveries");
    }
  }, [currentUser, setActive]);

  return (
    <section className="p-2 md:min-h-[500px]">
      {currentUser ? (
        <>
          {" "}
          <Toolbar
            role={currentUser.role ?? "user"}
            active={active}
            setActive={setActive}
          />
          {active === "Settings" && <Settings currentUser={currentUser} />}
          {currentUser.role === "user" && (
            <Userdashboard currentUser={currentUser} active={active} />
          )}
          {currentUser.role === "rider" && (
            <Riderdashboard currentUser={currentUser} active={active} setActive={setActive} />
          )}
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </section>
  );
}
