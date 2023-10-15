import { createUploadthing } from "uploadthing/next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
 
const f = createUploadthing();
 

export const FileRouter = {
   
  profilePicture: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
        const {isAuthenticated } = getKindeServerSession()
 
      if (!isAuthenticated()) throw new Error("Unauthorized");
      return { userId: 1 };
    })
    .onUploadComplete(async ({ metadata, file }) => {
    
      console.log("Upload complete for userId:", metadata.userId);
 
      console.log("file url", file.url);
    }),
} 
 
export default FileRouter 