import { requireAuth } from "@/lib/auth-utils";
import HomeClient from "./client";

export default async function Home() {
  await requireAuth();
  return (
    <div className="font-sans min-h-screen min-w-screen flex items-center justify-center">
      <HomeClient />
    </div>
  );
}
