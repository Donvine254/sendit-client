"use client";

import { UploadButton } from "@uploadthing/react";
import "@uploadthing/react/styles.css";
import toast from "react-hot-toast";

export default function UploadButtonPage({setCurrentUser}) {
 
 
  return (
    <main className="flex flex-col items-start justify-start">
      <UploadButton
        endpoint="profilePicture"
        onClientUploadComplete={(res) => {
          if (res) {
            setCurrentUser((prev)=>({
              ...prev,
              picture:res[0].fileUrl
            }))
          }
          toast.success("Upload Completed!");
        }}
        onUploadError={(error) => {
          toast.error(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
