import { ChevronRight, type LucideIcon } from "lucide-react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible.tsx"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "./ui/sidebar.tsx"
import { cn } from "../lib/utils.ts"
import { Link } from "react-router"
import { useSidebarNav } from "../context/sidebar-nav-provider.tsx"

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {
    const { activeItem, setActiveItem } = useSidebarNav()

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Details</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const isActive = activeItem?.title === item.title && !activeItem?.parent

                    return (
                        <Collapsible key={item.title} asChild defaultOpen={isActive}>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.title}
                                    className={cn(isActive && "bg-primary text-primary-foreground")}
                                    onClick={() => setActiveItem({ title: item.title, url: item.url })}
                                >
                                    <Link to={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                                {item.items?.length ? (
                                    <>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuAction
                                                className={cn(
                                                    isActive && "bg-primary text-primary-foreground",
                                                    "data-[state=open]:rotate-90"
                                                )}
                                            >
                                                <ChevronRight />
                                                <span className="sr-only">Toggle</span>
                                            </SidebarMenuAction>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items.map((subItem) => {
                                                    const isSubActive =
                                                        activeItem?.title === subItem.title &&
                                                        activeItem?.parent === item.title
                                                    return (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <SidebarMenuSubButton
                                                                asChild
                                                                className={cn(isSubActive && "bg-muted")}
                                                                onClick={() =>
                                                                    setActiveItem({
                                                                        title: subItem.title,
                                                                        url: subItem.url,
                                                                        parent: item.title,
                                                                    })
                                                                }
                                                            >
                                                                <Link to={subItem.url}>
                                                                    <span>{subItem.title}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    )
                                                })}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </>
                                ) : null}
                            </SidebarMenuItem>
                        </Collapsible>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}
