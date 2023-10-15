"use client";

import { useEffect, useState } from "react";

import { registerUser } from "@/lib";

import { useAppContext } from "@/context/context";
import  Loading  from "../../components/loading";

import toast from "react-hot-toast";

export default function Dashboard() {
  const [admin, setAdmin] = useState(false);
  const { setIsAdmin, setCurrentUser, setIsAutheticated, currentUser } = useAppContext();

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
        {currentUser ? <p>Welcome {currentUser.given_name}</p> : <p>Welcome </p>}
        {/* <button
          type="button"
          className="btn btn-sm accent text-white hover:text-black my-4 font-bold"
          onClick={() => toast.success("eat this toast!")}>
          Get Started
        </button> */}
        <p>Upload a profile picture</p>
        <input type="file" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
      </div>
     <Loading/>
    </div>
  );
}
