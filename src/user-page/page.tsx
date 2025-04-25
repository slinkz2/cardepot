// src/app/page.tsx

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { Card, CardContent } from "~/app/components/ui/card";
import { timeAgo } from "~/utils/helpers";
import { deleteImage, getMyUserImages } from "~/server/queries";
import BackButton from "~/app/components/BackButton";
import UserImage from "~/app/components/UserImage";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/app/components/ui/alert-dialog";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyUserImages();

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
      {images.map((image) => (
        <Card key={image.id} className="w-full pt-4 overflow-hidden transition-all duration-200 hover:shadow-lg border-b">
          <div className="flex pl-5 ml-1 mt-1">
            {/* Display the user's avatar (currently using a placeholder image) */}
            <img
              className="mt-1 mr-4 h-12 w-12 rounded-full object-cover shadow border border-gray-300"
              src={image.userImg || "/path/to/fallback-image.jpg"}  // Use a fallback image
              alt="avatar"
            />
            <div className="w-full">
              {/* Username and Upload Time */}
              <div className="flex justify-between items-center">
                {/* Username */}
                <p className="font-bold text-gray-800 px-1 py-2 rounded-lg">
                  {image.userName}
                </p>
                {/* Upload Time */}
                <p className="ml-5 mr-5 italic text-gray-600 text-sm">
                  {`Uploaded: ${timeAgo(new Date(image.createdAt))}`}
                </p>
              </div>
              {/* Image Caption */}
              <div className="mt-1 mb-1 mr-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-800 px-1 py-1 rounded-lg">
                  {image.caption ? image.caption : " "}
                </h3>
              </div>
            </div>
          </div>
          <Link href={`/img/${image.id}`} className="mt-1 block w-full h-[400px] overflow-hidden bg-muted pr-4 pl-4 pb-4">
            <div className="relative h-full w-full">
              <img
                src={image.url || "/placeholder.svg"}
                alt={image.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "0.5rem"
                }}
                loading="lazy"
              />
            </div>
          </Link>
          {/* Delete Button */}
          <div className="flex justify-end p-4">
            <AlertDialog>
                  <AlertDialogTrigger>Delete post</AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your post.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <form
                    action={async (formData: FormData) => {
                      "use server";

                      const id = formData.get("id");
                      if (!id || typeof id !== "string") {
                        throw new Error("Invalid image ID");
                      }

                      const idAsNumber = Number(id);
                      if (Number.isNaN(idAsNumber)) {
                        throw new Error("Invalid image ID");
                      }

                      // Delete the image
                      await deleteImage(idAsNumber);
                    }}
                  >
                    <input type="hidden" name="id" value={image.id} />

                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction type="submit">
                        Delete
                        </AlertDialogAction>
                  </form>
                      
                    </AlertDialogFooter>
                  </AlertDialogContent>
            </AlertDialog>
          </div>
        </Card>
      ))}
    </div>
      );
    }

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
<SignedOut>
  <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
    {/* Hero Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Store and share</span>
            <span className="block text-primary">your images easily</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
            Upload, organize, and share your images in one secure place. Access your photos from anywhere,
            anytime.
          </p>
          <div className="mt-8">
            <div className="inline-flex px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition duration-300 cursor-pointer">
              <SignInButton mode="modal">
                Sign In
              </SignInButton>
            </div>
          </div>
        </div>

        {/* Image Gallery - Card Style */}
        <div className="lg:w-1/2 mt-12 lg:mt-0">
          <div className="grid grid-cols-2 gap-4">
            {[
              "https://u4ocvzai6f.ufs.sh/f/5zX1RPP9E6ctEovAJ9GHAPpaqdrOBmLFz7NfCJEoeh0U8SIx",
              "https://u4ocvzai6f.ufs.sh/f/5zX1RPP9E6ctQdV6Lc4NyPovsDzXGaeJpH3m8i60fY1tKbIU",
              "https://u4ocvzai6f.ufs.sh/f/5zX1RPP9E6ctzy2H1WXTtiKuWCAIsV3YNMrgHcdB0n64TeqP",
              "https://u4ocvzai6f.ufs.sh/f/5zX1RPP9E6ctlRtjnRoVBiLunfsD5WS3mxReUQjZvwpXy0MK"
            ].map((url, index) => (
              <div 
                key={index}
                className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-square w-full bg-gray-100">
                  <img
                    src={url}
                    alt="Gallery preview"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-medium">Sample Image {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</SignedOut>
      <SignedIn>
        <div className="top-0 z-10 bg-gray-50">
          <div className="max-w-3xl mx-auto flex flex-col items-center py-6 px-4 shadow-lg w-full rounded-b-lg bg-gray-100">
            {/* BackButton at the upper corner left */}
            <div className="self-start">
              <BackButton />
            </div>

            {/* UserView at the center with large impact */}
            <div className="flex flex-col items-center gap-4 mt-4">
              <UserImage />
            </div>
          </div>
        </div>
        <div className="py-4 px-4">
          <Images />
        </div>
      </SignedIn>
    </main>
  );
}