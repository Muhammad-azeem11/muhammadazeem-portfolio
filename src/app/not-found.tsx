import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-6 text-navy-900 font-display font-bold text-2xl">
        404
      </div>
      <h1 className="text-3xl md:text-5xl font-display font-bold text-navy-900 mb-4 tracking-tight">
        Page Not Found
      </h1>
      <p className="text-neutral-500 max-w-md mx-auto mb-8 text-lg">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-navy-900 text-white px-6 py-3 rounded-full font-medium hover:bg-navy-800 transition-colors shadow-md hover:shadow-lg"
      >
        <ArrowLeft size={18} />
        Return Home
      </Link>
    </div>
  );
}
