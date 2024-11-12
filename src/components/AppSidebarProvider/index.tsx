"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren, useState } from "react";

export const AppSidebarProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      {children}
    </SidebarProvider>
  );
};
