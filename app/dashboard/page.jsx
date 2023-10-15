"use client";

import { useEffect, useState } from "react";

import { registerUser } from "@/lib";

import { useAppContext } from "@/context/context";
import  Loading  from "../../components/loading";
import UploadButtonPage from "@/components/uploadButton"
import Image from "next/image";

import toast from "react-hot-toast";

export default function Dashboard() {
  const [admin, setAdmin] = useState(false);
  const { setIsAdmin, setCurrentUser, setIsAutheticated, currentUser } = useAppContext();
  const [image, setImage] = useState();
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
      <div className="p-4 container mx-auto ">
        {currentUser && <Image src={image? image:currentUser.picture} width={50} height={50} alt="user-avatar" className="avatar rounded-full"/>}
        {currentUser ? <p className="font-bold">Welcome {currentUser.given_name}</p> : <p>Welcome </p>}
        
      </div>
      <p>Upload a profile picture</p>
        <UploadButtonPage setImage={setImage} image={image}/>
     <Loading/>
    </div>
  );
}
