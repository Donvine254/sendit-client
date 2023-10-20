"use client";

import { useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useAppContext } from "@/context/context";
import  Loading  from "../../components/loading";
import { updateUserDetails } from "@/lib";
import UploadButtonPage from "@/components/uploadButton"
import Image from "next/image";
import Link from "next/link"
import toast from "react-hot-toast";

export default function Dashboard() {
  const {currentUser, setCurrentUser } = useAppContext();
  const [phone_number, setPhone_number]=useState();
  function handleChange(){
    updateUserDetails(currentUser,phone_number, setCurrentUser);
    toast.success("processing request...")
  }

  return (
    <div className="mx-4 md:min-h-[400px]">
      <div className="p-4 container mx-auto flex items-center justify-center ">
        {currentUser && <Image src={currentUser.picture} width={50} height={50} alt="user-avatar" className="avatar rounded-full"/>}
        {currentUser ? <p className="font-bold">Welcome {currentUser.given_name}</p> : <p>Welcome </p>}
        
      </div>
      <p>Upload a profile picture</p>
        <UploadButtonPage/>
        <p>Update Phone Number</p>
        <PhoneInput value={phone_number} onChange={setPhone_number} defaultCountry="KE" className="input input-bordered"/>
        <button className="btn btn-primary hero-btn my-5"onClick={handleChange}>Submit</button>
      {/* <Link href="/dashboard/settings" className="btn btn-ghost flex items-center gap-2 w-36"> Settings</Link> */}
     <Loading/>
    </div>
  );
}
