"use client";

import { authClient } from "@/lib/auth-client";
import Logout from "@/components/logout";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const HomeClient = () => {
  const { data, isPending } = authClient.useSession();
  const trpc = useTRPC();
  const { data: workflows } = useQuery(trpc.getWorkFlows.queryOptions());
  const createWorkflow = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: () => {
        toast.success("Job queued");
      },
    })
  );

  return (
    <div className="font-sans min-h-screen min-w-screen flex flex-col justify-center items-center gap-4">
      {isPending ? "Loading..." : "Welcome to n8n clone"}
      <br />
      <ul className="list-disc">
        {workflows?.map((workflow) => (
          <li key={workflow.id}>{workflow.name}</li>
        ))}
      </ul>

      <Button
        onClick={() => createWorkflow.mutate()}
        disabled={createWorkflow.isPending}
      >
        Create workflow
      </Button>
      {data && <Logout />}
    </div>
  );
};

export default HomeClient;
