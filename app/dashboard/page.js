"use client";

import { useEffect, useState } from "react";

import { registerUser } from "@/lib";

import { useAppContext } from "@/context/context";
import  Loading  from "../../components/loading";

import toast from "react-hot-toast";

export default function Dashboard() {
  const [admin, setAdmin] = useState(false);
  const { setIsAdmin, setCurrentUser, setIsAutheticated } = useAppContext();

  useEffect(() => {
    const getKindeSession = async () => {
      const res = await fetch("/api/kindeSession");
      const data = await res.json();
      setIsAutheticated(data.authenticated);
      setAdmin(data.isAdmin);
      registerUser(data, setIsAdmin, setCurrentUser);
      setCurrentUser(data.user);
    };

    getKindeSession();
  }, [setIsAdmin, setCurrentUser, setIsAutheticated]);
  return (
    <div className="mx-4 md:min-h-[400px]">
      <div className="p-4">
        {admin ? <p>Welcome admin</p> : <p>Welcome user</p>}
        <button
          type="button"
          className="btn btn-sm accent text-white hover:text-black my-4 font-bold"
          onClick={() => toast.success("you clicked me!")}>
          Get Started
        </button>
      </div>
     <Loading/>
    </div>
  );
}
