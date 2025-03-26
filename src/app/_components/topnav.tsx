"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/utils/uploadthing";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { SimpleUploadButton } from "./simple-upload-button";

export default function TopNav() {

  return (
    <nav className="relative flex w-full p-5 text-xl font-semibold items-center justify-between">
    <div className="absolute left-1/2 transform -translate-x-1/2">
      <img 
        src="https://c8hsctiqb3.ufs.sh/f/RXFntDrDYyBvF36gMJnTCaWmAZ3pbMLntQhvHPglDd5x9K8i" 
        alt="Logo" 
        className="h-10" 
      />
    </div>
      <div className="flex flex-row items-center ml-auto">
        <SignedOut>
          <SignInButton>
            <button className="flex p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <User className="w-6 h-6 " />
            </button>
          </SignInButton>
        </SignedOut>  
          <div className="flex flex-row items-center justify-between gap-5 ">
            <SignedIn>
              <SimpleUploadButton />
              <UserButton/>
          
             </SignedIn>
         </div>
      </div>
    </nav>
  );
}