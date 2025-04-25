
"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function TopNav() {

  return (
    <nav className="relative flex w-full items-center justify-between bg-neutral-900 py-3 px-8 text-xl font-semibold">
    {/* Centered logo using absolute + translate */}
    <div className="relative h-16 bg-neutral-900">
  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <img
      className="h-8 w-auto rounded"
      src="https://c8hsctiqb3.ufs.sh/f/RXFntDrDYyBvlpXGS511yHVIfmNlnTxitDeuoKkYZJMqdgaQ"
      alt="Logo"
      width="150"
      height="150"
    />
  </div>
</div>

  
    {/* Right-aligned auth section */}
    <div className="flex flex-row items-center gap-4 ml-auto">
      <SignedOut></SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  </nav>
  
  );
}