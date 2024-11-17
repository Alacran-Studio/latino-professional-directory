import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/common/Shadcn/ui/sidebar";
import { FullBrand } from "@/components/common/FullBrand";
import Link from "next/link";
import { InternalNavigationLinks } from "@/app/types";

interface AppSidebarProps {
  links: InternalNavigationLinks;
}

export function AppSidebar({ links }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <span className="mt-6 [&_p]:text-logo-mobile">
              <FullBrand fillColor="var(--logo-line-mobile)" />
            </span>
          </SidebarGroupLabel>
          <SidebarSeparator className="my-4" />
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>{item.name}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
