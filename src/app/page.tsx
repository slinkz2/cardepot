// src/app/page.tsx

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { getMyImages } from "~/server/queries";
import { Card, CardContent } from "../app/components/ui/card";
import { timeAgo } from "~/utils/helpers";
import UserView from "../app/components/User-View";
import UploadModal from "../app/components/Upload-modal";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto">
      {images.map((image) => (
        <Card key={image.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
          {/* User Header */}
          <div className="flex items-center p-4 pb-2">
            <img
              className="h-9 w-9 rounded-full object-cover border border-gray-200"
              src={image.userImg || "/default-avatar.jpg"}
              alt="User avatar"
            />
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {image.userName}
              </p>
              <p className="text-xs text-gray-500">
                {timeAgo(new Date(image.createdAt))}
              </p>
            </div>
          </div>

          {/* Image with Link */}
          <Link 
            href={`/img/${image.id}`} 
            className="block relative aspect-[4/3] overflow-hidden bg-gray-50"
          >
            <img
              src={image.url || "/placeholder.svg"}
              alt={image.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </Link>

          {/* Caption */}
          {image.caption && (
            <CardContent className="p-4 pt-2">
              <p className="text-sm text-gray-700 line-clamp-2">
                {image.caption}
              </p>
            </CardContent>
          )}

          {/* Interaction Buttons */}
          <div className="flex items-center p-4 pt-0 border-t border-gray-100">
            <button className="flex items-center text-gray-500 hover:text-red-500 mr-4">
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-xs">24</span>
            </button>
            <button className="flex items-center text-gray-500 hover:text-blue-500">
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-xs">5</span>
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
<SignedOut>
  <div className="flex justify-center items-center min-h-screen px-4 bg-gray-100">
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl w-full">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Connect and socialize</span>
            <span className="block text-primary">Share your builds</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
            Join the community of Motorcycle Concept builders!
          </p>
          <div className="mt-8">
            <div className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition duration-300 cursor-pointer inline-block">
              <SignInButton mode="modal">Sign In Now</SignInButton>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0">
          <div className="relative h-[260px] w-full overflow-hidden rounded-xl shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 z-10 rounded-xl"></div>
            <div className="grid grid-cols-2 gap-2 p-3 absolute inset-0">
              <div className="space-y-2">
                {[
                  "https://c8hsctiqb3.ufs.sh/f/RXFntDrDYyBvsQd1WjSvbFOXIMZK8PjnyvTRz62U10SrLeDWM",
                  "https://c8hsctiqb3.ufs.sh/f/RXFntDrDYyBvFySjW7nTCaWmAZ3pbMLntQhvHPglDd5x9K8i",
                  "https://c8hsctiqb3.ufs.sh/f/RXFntDrDYyBv5PEYzYtX3ZJDaiOT50Hy8IqzhUgMNcWxvrtG",
                  "https://c8hsctiqb3.ufs.sh/f/RXFntDrDYyBvn9Cm0tAv0Pda52SZmBGnfpE9zNHMc4Dhgi3Y"
                ].map((url, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm h-20 overflow-hidden">
                    <img src={url} alt="Gallery preview" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</SignedOut>


      
<SignedIn>
  <header className="sticky top-0 z-20 bg-white shadow-sm border-b">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
      {/* Left: User avatar linking to user page */}
      <Link href="/user-page" className="flex items-center gap-2">
        <UserView />
        <span className="text-sm font-medium text-gray-700 hidden sm:inline">My Profile</span>
      </Link>

      {/* Right: Upload modal */}
      <UploadModal />
    </div>
  </header>

  <div className="py-6">
    <Images />
  </div>
</SignedIn>

    </main>
  );
}