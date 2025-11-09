import { requireAuth } from "@/lib/auth-utils";

interface PageProps {
  params: Promise<{ credentialId: string }>;
}

export default async function CredentialsId({ params }: PageProps) {
  await requireAuth();
  const { credentialId } = await params;
  return <div>{credentialId}</div>;
}
