"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HomeClient = () => {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  return (
    <div className="font-sans min-h-screen min-w-screen flex flex-col justify-center">
      {isPending ? "Loading..." : "Welcome to n8n clone"}
      {data && (
        <Button
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.replace("/login");
                },
              },
            })
          }
        >
          Logout
        </Button>
      )}
    </div>
  );
};

export default HomeClient;
