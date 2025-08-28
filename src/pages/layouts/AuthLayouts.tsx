import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import isLoggedIn from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

interface User {
  name: string;
  email: string;
}

export default function AuthLayouts() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const checkLogin = async () => {
      const user = await isLoggedIn();
      setLoggedIn(!!user);
      setUser(user && user);
      setLoading(false);
    };
    checkLogin();
  }, []);

  if (loading) return null;

  if (!loggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-5">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
