import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";
export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, {desc}) => desc(model.id),
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center  text-white">
     <div>
       {images.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
            <div className="flex justify-center">{image.name}</div>
          </div>
       ))}
     </div>
    </main>
  );
}
