import { Outlet } from "react-router";
import { AppSidebar } from "../components/app-sidebar";
import { NavUser } from "../components/nav-user";
import { ThemeModeToggle } from "../components/theme-mode-toggle";
import { Separator } from "../components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { SidebarNavProvider } from "../context/sidebar-nav-provider";


export default function MainScreen() {
    return (
        <div className="min-h-screen bg-background text-foreground">

            <SidebarProvider>

                <SidebarNavProvider>
                    <AppSidebar />
                </SidebarNavProvider>

                   <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2">
                        <div className="flex items-center gap-2 px-4 justify-between w-full">
                            <div className="flex items-center">
                                <SidebarTrigger className="-ml-1"/>
                                <Separator orientation="vertical" className="mr-2 h-4"/>
                                
                            </div>
                            <div className="flex items-center gap-2">
                                <ThemeModeToggle/>
                                <NavUser size="sm"/>
                            </div>
                        </div>
                    </header>
                    <Outlet/>
                </SidebarInset>

            </SidebarProvider >
        </div>
    );
}