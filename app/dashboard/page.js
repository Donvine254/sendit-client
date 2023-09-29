"use client";

import { useEffect, useState} from "react";

import { registerUser } from "@/lib";

import { useAppContext } from "@/context/context";
import toast from "react-hot-toast";

export default function Dashboard() {
    const [admin, setAdmin] = useState(false)
  const { setIsAdmin, setCurrentUser, setIsAutheticated } = useAppContext();

  useEffect(() => {
    const getKindeSession = async () => {
      const res = await fetch("/api/kindeSession");
      const data = await res.json();
      setIsAutheticated(data.authenticated);
      setAdmin(data.isAdmin)
      registerUser(data, setIsAdmin, setCurrentUser);
      console.log(data.user)
    };

    getKindeSession();
  }, []);

  return (
    <div className="">
      <div className="">
        {isAdmin?<p>Welcome admin</p>:<p>Welcome user</p>}
        <button
          type="button"
          className="btn btn-info text-white font-bold text-2xl"
          onClick={() => toast.success("you clicked me!")}>
          Get Started
        </button>
      </div>
      <section className="">
        <h2 className="text-2xl font-bold">
          This page is currently under development
        </h2>
      </section>
    </div>
  );
}
