// src/app/components/BackButton.tsx

"use client";

import { useRouter } from "next/navigation";
import { Button } from "../../app/components/ui/button";

export default function BackButton() {
    const router = useRouter();
    return (
        <Button onClick={() => router.back()} className="mb-4">
            Back
        </Button>
    );
}
