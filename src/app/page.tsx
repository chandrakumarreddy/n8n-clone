import prisma from "@/lib/db";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div className="font-sans min-h-screen min-w-screen flex items-center justify-center">
      {JSON.stringify(users)}
    </div>
  );
}
