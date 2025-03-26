"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import { SimpleUploadButton } from "./simple-upload-button";

export default function TopNav() {
  return (
    <nav className="relative flex w-full py-4 px-5 text-xl font-semibold items-center justify-between">

  {/* Centered Logo */}
  <div className="flex justify-center items-center w-1/3">
    <img 
      src="https://c8hsctiqb3.ufs.sh/f/RXFntDrDYyBvF36gMJnTCaWmAZ3pbMLntQhvHPglDd5x9K8i" 
      alt="Logo" 
      className="h-12"
    />
  </div>

  

    
      <div className="flex flex-row items-center ml-auto space-x-5">
        <SignedOut>
          <SignInButton>
            <button className="flex p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <User className="w-6 h-6" />
            </button>
          </SignInButton>
        </SignedOut>  
        <SignedIn>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
   
      </div>
    </nav>
  );
}
