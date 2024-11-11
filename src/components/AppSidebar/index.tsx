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
} from "@/components/ui/sidebar";
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
            <span className="[&_p]:text-logo-mobile mt-6">
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
