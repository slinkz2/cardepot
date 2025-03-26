import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";
import Carousel from "./_components/carousel";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { getMyImages } from "~/server/queries";
import { object } from "zod";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";
async function Images(){
  const images = await getMyImages();
  return (  
    <div className="flex flex-wrap gap-6">
      {images.map((image) => (
        <div key={image.id} className="w-75 flex flex-col items-center">
          <Link href={`img/${image.id}`}>
          <Image
           src={image.url} 
           style={{objectFit: "contain"}}
           width={480}
           height={480}
           alt={image.name}
           />
          </Link>
          <div className="text-center mt-2 font-medium">{image.name}</div>
        </div>
      ))}
    </div>
  );
  
}
export default async function HomePage() {
  return (
    <main className="flex text-white">
     <SignedOut>
        <div className="h-full w-full p-1 text-2xl text-center ">
            𝗣𝗟𝗘𝗔𝗦𝗘 𝗦𝗜𝗚𝗡 𝗜𝗡 𝗧𝗢 𝗦𝗘𝗘 𝗠𝗢𝗥𝗘 𝗖𝗔𝗥 𝗜𝗠𝗔𝗚𝗘𝗦
        </div>
        <footer className="w-full text-center text-sm p-2 bg-auto fixed bottom-0">
            © CAR DEPOT PHILIPPINES CORPORATION. 2025 ALL RIGHTS RESERVED
        </footer>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    
    </main>
  );
}
