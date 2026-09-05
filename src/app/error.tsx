"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-600 mb-6">
        <AlertTriangle size={32} />
      </div>
      <h1 className="text-3xl md:text-5xl font-display font-bold text-navy-900 mb-4 tracking-tight">
        Something went wrong
      </h1>
      <p className="text-neutral-500 max-w-md mx-auto mb-8 text-lg">
        An unexpected error occurred. We have been notified and are looking into it.
      </p>
      <Button
        onClick={() => reset()}
        className="bg-navy-900 text-white px-6 py-3 rounded-full font-medium hover:bg-navy-800 transition-colors shadow-md hover:shadow-lg"
      >
        Try Again
      </Button>
    </div>
  );
}
