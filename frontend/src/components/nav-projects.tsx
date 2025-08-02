import {Folder, type LucideIcon, MoreHorizontal, Share, Trash2,} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {Link} from "react-router"
import {cn} from "@/lib/utils"
import {useSidebarNav} from "@/context/sidebar-nav-provider"

export function NavProjects({
                                projects,
                            }: {
    projects: {
        name: string
        url: string
        icon: LucideIcon
    }[]
}) {
    const {isMobile} = useSidebar()
    const {activeItem, setActiveItem} = useSidebarNav()

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
                {projects.map((item) => {
                    const isActive = activeItem?.title === item.name
                    return (
                        <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton
                                asChild
                                className={cn(isActive && "bg-primary text-primary-foreground")}
                                onClick={() => setActiveItem({title: item.name, url: item.url})}
                            >
                                <Link to={item.url}>
                                    <item.icon/>
                                    <span>{item.name}</span>
                                </Link>
                            </SidebarMenuButton>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuAction showOnHover>
                                        <MoreHorizontal/>
                                        <span className="sr-only">More</span>
                                    </SidebarMenuAction>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-48"
                                    side={isMobile ? "bottom" : "right"}
                                    align={isMobile ? "end" : "start"}
                                >
                                    <DropdownMenuItem>
                                        <Folder className="text-muted-foreground"/>
                                        <span>View Project</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Share className="text-muted-foreground"/>
                                        <span>Share Project</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem>
                                        <Trash2 className="text-muted-foreground"/>
                                        <span>Delete Project</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
