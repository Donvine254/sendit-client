"use client";

import { useEffect, useState } from "react";

import { registerUser } from "@/lib";

import { useAppContext } from "@/context/context";
import  Loading  from "../../components/loading";
import UploadButtonPage from "@/components/uploadButton"
import Image from "next/image";
import Link from "next/link"
import toast from "react-hot-toast";

export default function Dashboard() {
  const {  setCurrentUser,
  currentUser } = useAppContext();
  const [image, setImage] = useState();
  useEffect(() => {
    const getKindeSession = async () => {
      const res = await fetch("/api/kindeSession");
      const data = await res.json();
      registerUser(data, setCurrentUser);
    };

    getKindeSession();
  }, [setCurrentUser]);
 
  return (
    <div className="mx-4 md:min-h-[400px]">
      <div className="p-4 container mx-auto flex items-center justify-center ">
        {currentUser && <Image src={image? image:currentUser.picture} width={50} height={50} alt="user-avatar" className="avatar rounded-full"/>}
        {currentUser ? <p className="font-bold">Welcome {currentUser.given_name}</p> : <p>Welcome </p>}
        
      </div>
      <p>Upload a profile picture</p>
        <UploadButtonPage setImage={setImage} image={image}/>
      <Link href="/dashboard/settings" className="btn btn-ghost flex items-center gap-2 w-36"> Settings</Link>
     <Loading/>
    </div>
  );
}
