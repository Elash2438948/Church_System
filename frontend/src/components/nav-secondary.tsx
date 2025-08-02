import * as React from "react"
import {type LucideIcon} from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {Link} from "react-router"
import {cn} from "@/lib/utils"
import {useSidebarNav} from "@/context/sidebar-nav-provider.tsx";

export function NavSecondary({
                                 items,
                                 ...props
                             }: {
    items: {
        title: string
        url: string
        icon: LucideIcon
    }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
    const {activeItem, setActiveItem} = useSidebarNav()

    return (
        <SidebarGroup {...props}>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => {
                        const isActive = activeItem?.title === item.title
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    size="sm"
                                    className={cn(isActive && "bg-muted")}
                                    onClick={() => setActiveItem({title: item.title, url: item.url})}
                                >
                                    <Link to={item.url}>
                                        <item.icon/>
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
