import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { db } from "~/server/db";
import Carousel from "./_components/carousel";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";



export const dynamic = "force-dynamic";

async function Images(){
  const user =  await auth();
  if (!user.userId) throw new Error ("Unauthorized");
  
  const images = await db.query.images.findMany({
    where: (model) => eq(model.userId, user.userId),
    orderBy: (model, {desc}) => desc(model.id),
  });
  return (
    <div className="flex flex-wrap gap-6">
      {images.map((image, index) => (
        <div key={image.id} className="w-75 flex flex-col items-center">
          <img src={image.url} className="w-full h-auto rounded-lg shadow-md" />
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
        <div className="h-full w-full p-1 text-2xl text-center">
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
