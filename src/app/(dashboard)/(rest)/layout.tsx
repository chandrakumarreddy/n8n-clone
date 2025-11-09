import AppHeader from "@/components/app-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1">
      <AppHeader />
      <main className="flex-1 p-2">{children}</main>
    </div>
  );
}
