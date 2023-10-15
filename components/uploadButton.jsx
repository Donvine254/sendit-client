"use client";

import { UploadButton } from "@uploadthing/react";
import "@uploadthing/react/styles.css";
import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";

export default function UploadButtonPage({setImage, image}) {
 
  const imgList = image ? (
      <p>Upload Complete!</p>
  ) : null;

  return (
    <main className="flex flex-col items-start justify-start">
      <UploadButton
        endpoint="profilePicture"
        onClientUploadComplete={(res) => {
          if (res) {
            setImage(res[0].fileUrl);
          }
          toast.success("Upload Completed!");
        }}
        onUploadError={(error) => {
          toast.error(`ERROR! ${error.message}`);
        }}
      />
      {imgList}
    </main>
  );
}
