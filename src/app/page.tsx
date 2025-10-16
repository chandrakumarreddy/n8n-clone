// "use client";
import { useTRPC } from "@/trpc/client";
// import { useQuery } from "@tanstack/react-query";
import { dehydrate, hydrate, HydrationBoundary } from "@tanstack/react-query";
import Client from "./client";
import { caller, getQueryClient, trpc } from "@/trpc/server";
import { Suspense } from "react";

export default async function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  return (
    <div className="font-sans min-h-screen min-w-screen flex items-center justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
          <Client />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
