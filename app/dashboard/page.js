"use client";

import { useEffect, useState } from "react";

import {registerUser} from "@/lib"

import toast from 'react-hot-toast';

export default function Dashboard() {
  const [authStatus, setAuthStatus] = useState(null);
  useEffect(() => {
    const getKindeSession = async () => {
      const res = await fetch("/api/kindeSession");
      const data = await res.json();
			setAuthStatus(data.authenticated);
      registerUser(data);
    };

    getKindeSession();
    
  }, []);
 
  return (
    <div className="">
      <div className="">
        <p className="">
          Welcome to SENDIT, the only online courier you can trust.
          <br />
        </p>
        <button
          type="button"
          className="btn btn-info text-white font-bold text-2xl"
          onClick={()=>toast("you clicked me!")}
          >
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