import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Loader from "./ui/loader";

export default function Logout() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  return (
    <Button
      className="w-fit"
      onClick={() => {
        setIsPending(true);
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.replace("/login");
              setIsPending(false);
            },
            onError: () => {
              setIsPending(false);
            },
          },
        });
      }}
    >
      Logout
      {isPending && <Loader size={16} />}
    </Button>
  );
}
