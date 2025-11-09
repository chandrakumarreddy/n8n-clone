import React from "react";
import { SidebarTrigger } from "./ui/sidebar";

export default function AppHeader() {
  return (
    <header className="flex shrink-0 h-10 bg-background border-b">
      <SidebarTrigger />
    </header>
  );
}
