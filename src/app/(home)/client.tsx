"use client";

import { authClient } from "@/lib/auth-client";
import Logout from "@/components/logout";

const HomeClient = () => {
  const { data, isPending } = authClient.useSession();
  return (
    <div className="font-sans min-h-screen min-w-screen flex flex-col justify-center">
      {isPending ? "Loading..." : "Welcome to n8n clone"}
      {data && <Logout />}
    </div>
  );
};

export default HomeClient;
