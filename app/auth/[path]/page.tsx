import { AuthView } from "@neondatabase/auth/react"; // Use /react to match your layout
import Link from "next/link";

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="shadow-2xl w-full max-w-xl p-8 border border-border bg-card/50 backdrop-blur-sm rounded-2xl flex flex-col items-center">
        <AuthView pathname={path} />
        <Link href="/" className="mt-4 text-sm hover:underline">
          Go back home
        </Link>
      </div>
    </div>
  );
}
