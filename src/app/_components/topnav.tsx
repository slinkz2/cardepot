"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/utils/uploadthing";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TopNav() {
  const router = useRouter();
  return (
    <nav className="relative flex w-full p-5 text-xl font-semibold items-center justify-between">
    <div className="absolute left-1/2 transform -translate-x-1/2">
      <img 
        src="https://c8hsctiqb3.ufs.sh/f/RXFntDrDYyBvF36gMJnTCaWmAZ3pbMLntQhvHPglDd5x9K8i" 
        alt="Logo" 
        className="h-10" 
      />
    </div>
      <div className="flex flex-row ml-auto">
        <SignedOut>
          <SignInButton>
            <button className="flex p-2 rounded-full hover:bg-gray-200 cursor-pointer">
              <User className="w-6 h-6 " />
            </button>
          </SignInButton>
        </SignedOut>  
        <SignedIn>
            <UploadButton endpoint="imageUploader" onClientUploadComplete={() => {
              router.refresh();
            }} />
          <div className="flex flex-row ml-4">
          <UserButton/>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}