import { LayoutDashboard, FileText, Users, MessageSquare, ClipboardCheck, Settings, Briefcase } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const recruiterItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "JD Builder", url: "/jd-builder", icon: FileText },
  { title: "Resume Parser", url: "/resume-parser", icon: Briefcase },
  { title: "Candidates", url: "/candidates", icon: Users },
  { title: "Communication", url: "/communication/1", icon: MessageSquare },
  { title: "Feedback", url: "/feedback/1", icon: ClipboardCheck },
  { title: "Settings", url: "#", icon: Settings },
];

const hiringManagerItems = [
  { title: "Dashboard", url: "/hiring-manager", icon: LayoutDashboard },
  { title: "Shortlisted", url: "/candidates", icon: Users },
  { title: "Feedback", url: "/feedback/1", icon: ClipboardCheck },
  { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar({ userRole = "recruiter" }: { userRole?: "recruiter" | "hiring-manager" }) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const items = userRole === "recruiter" ? recruiterItems : hiringManagerItems;

  const isActive = (path: string) => {
    if (path === "#") return false;
    return currentPath === path || currentPath.startsWith(path + "/");
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent>
        <div className="px-6 py-4">
          <h2 className="text-xl font-bold text-primary">SmartHire</h2>
          <p className="text-xs text-muted-foreground">Modern Hiring, Simplified</p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-primary text-primary-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
