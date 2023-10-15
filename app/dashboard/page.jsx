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
  const [capturedImage, setCapturedImage] = useState(null);
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
  //function to request access to user's camera:
  
  const handleCaptureImage = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");

      video.srcObject = mediaStream;
      await video.play();

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
      const capturedImageUrl = canvas.toDataURL("image/jpeg");

      setCapturedImage(capturedImageUrl);
      
      // Stop capturing and close the camera
      mediaStream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error("Error accessing the camera: ", error);
    }
  };
  return (
    <div className="mx-4 md:min-h-[400px]">
      <div className="p-4 container mx-auto ">
        {currentUser && <Image src={image? image:currentUser.picture} width={50} height={50} alt="user-avatar" className="avatar rounded-full"/>}
        {currentUser ? <p className="font-bold">Welcome {currentUser.given_name}</p> : <p>Welcome </p>}
        
      </div>
      <p>Upload a profile picture</p>
        <UploadButtonPage setImage={setImage} image={image}/>
        <div className="divider">Or</div>
        <button onClick={handleCaptureImage} className="btn btn-neutral">Capture from Camera</button>
        {capturedImage && (
        <div>
          <h3>Captured Image</h3>
          <img src={capturedImage} alt="Captured" />
        </div>
      )}
     {/* <Loading/> */}
    </div>
  );
}
