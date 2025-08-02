import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
} from "lucide-react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "../components/ui/sidebar";
import {type ReactNode} from "react";
import {useNavigate} from "react-router";

export function NavUser({size}: { size?: string }) {
    const {isMobile} = useSidebar()

    const navigate = useNavigate();
    const user = {
        name: "Main Admin",
        email: "opoku.chinedu@fort.com",
        avatar: "https://api.dicebear.com/9.x/personas/svg?seed=Jack",
    }

    const avatarVariants: Record<string, ReactNode> = {
        default: (
            <DropdownMenuTrigger asChild className="group">
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user.avatar} alt={user.name}/>
                        <AvatarFallback className="rounded-lg">MA</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{user.name}</span>
                        <span className="truncate text-xs">{user.email}</span>
                    </div>
                    <ChevronsUpDown
                        className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]:rotate-180"/>
                </SidebarMenuButton>
            </DropdownMenuTrigger>
        ),
        sm: (
            <DropdownMenuTrigger asChild className="group">
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground border"
                >
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user.avatar} alt={user.name}/>
                        <AvatarFallback className="rounded-lg">MA</AvatarFallback>
                    </Avatar>
                </SidebarMenuButton>
            </DropdownMenuTrigger>
        ),
    }

    const chosenAvatar = avatarVariants[size ?? "default"] ?? avatarVariants["default"]

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    {/* 👇 Render avatar based on `size` prop */}
                    {chosenAvatar}

                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.name}/>
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user.name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck/>
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard/>
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell/>
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={() => navigate("/")}>
                            <LogOut/>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
