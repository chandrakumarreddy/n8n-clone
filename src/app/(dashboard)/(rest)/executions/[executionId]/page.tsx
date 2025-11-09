interface pageProps {
  params: Promise<{ executionId: string }>;
}

export default async function ExecutionId({ params }: pageProps) {
  const { executionId } = await params;
  return <div>{executionId}</div>;
}
