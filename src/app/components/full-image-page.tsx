import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: {id: number}) {
    const image = await getImage(props.id);
    const uploaderInfo = await (await clerkClient()).
    users.getUser(image.userId);
    return (
        <div className="flex flex-col md:flex-row h-full w-full gap-4 p-4 border rounded-lg shadow-lg">
          <div className="flex items-center gap-4">
            <img
              src={image.url}
              alt={image.name}
              className="w-130 h-auto object-contain rounded-lg border justify-center"
            />
            <div className="pl-4 flex flex-col justify-center">
              <div className="text-lg font-semibold">{image.name}</div>
            </div>
          </div>
      
          <div className="flex flex-col gap-2 border-t pt-2">
            <div>
              <span className="font-medium">Uploaded By: </span>
              <span>{uploaderInfo.fullName}</span>
            </div>
            <div>
              <span className="font-medium">Created At: </span>
              <span>{new Date(image.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      );
      
}