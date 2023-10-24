"use client";

import { UploadButton } from "@uploadthing/react";
import "@uploadthing/react/styles.css";
import toast from "react-hot-toast";
import { Axios } from "axios";

export default function UploadButtonPage({setCurrentUser, id}) {
 async function updateUserPicture(picture){
  try {
    const response = await Axios.patch(`https://sendit.up.railway.app/users/${id}`, {picture:picture})
    const data = await response.data
    toast.success("image updated successfully!")
  } catch (error) {
    toast.error(error)
  }
 }
 
  return (
    <main className="flex flex-col items-start justify-start">
      <UploadButton
        endpoint="profilePicture"
        onClientUploadComplete={(res) => {
          if (res) {
            toast.success("Upload Completed!");
            setCurrentUser((prev)=>({
              ...prev,
              picture:res[0].fileUrl
            }))
          }
         
          updateUserPicture(res[0].fileUrl)
        }}
        onUploadError={(error) => {
          toast.error(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
