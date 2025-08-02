import * as React from "react"


import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,

} from "./ui/sidebar.tsx"
import { NavMain } from "./nav-all-invoices";
import { NavUser } from "./nav-user";
import {FileText, UsersRound, ClipboardMinus} from "lucide-react";



const data = {
    // Future feature
    shops: [
        {
            title: "Shop 1",
            url: "#",
        },
        {
            title: "Shop 2",
            url: "#",
        },
        {
            title: "Shop 3",
            url: "#",
        },
    ],
    invoices: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: FileText,
            isActive: true,
        },
        {
            title: "Membership",
            url: "/all-invoices",
            icon: FileText,
            isActive: true,
        },
        {
            title: "Reports",
            url: "/reports",
            icon: ClipboardMinus,
            isActive: true,
        },
        {
            title: "Profile",
            url: "/profile",
            icon: UsersRound,
            isActive: true,
        },
        // {
        //     title: "Operators",
        //     url: "/operators",
        //     icon: SquareTerminal,
        //     isActive: true,
        // },

        // {
        //     title: "Models",
        //     url: "#",
        //     icon: Bot,
        //     items: [
        //         {
        //             title: "Genesis",
        //             url: "#",
        //         },
        //         {
        //             title: "Explorer",
        //             url: "#",
        //         },
        //         {
        //             title: "Quantum",
        //             url: "#",
        //         },
        //     ],
        // },
        // {
        //     title: "Documentation",
        //     url: "#",
        //     icon: BookOpen,
        //     items: [
        //         {
        //             title: "Introduction",
        //             url: "#",
        //         },
        //         {
        //             title: "Get Started",
        //             url: "#",
        //         },
        //         {
        //             title: "Tutorials",
        //             url: "#",
        //         },
        //         {
        //             title: "Changelog",
        //             url: "#",
        //         },
        //     ],
        // },
        // {
        //     title: "Settings",
        //     url: "#",
        //     icon: Settings2,
        //     items: [
        //         {
        //             title: "General",
        //             url: "#",
        //         },
        //         {
        //             title: "Team",
        //             url: "#",
        //         },
        //         {
        //             title: "Billing",
        //             url: "#",
        //         },
        //         {
        //             title: "Limits",
        //             url: "#",
        //         },
        //     ],
        // },
    ],
    // navSecondary: [
    //     {
    //         title: "Support",
    //         url: "#",
    //         icon: LifeBuoy,
    //     },
    //     {
    //         title: "Feedback",
    //         url: "#",
    //         icon: Send,
    //     },
    // ],
    // projects: [
    //     {
    //         name: "Design Engineering",
    //         url: "#",
    //         icon: Frame,
    //     },
    //     {
    //         name: "Sales & Marketing",
    //         url: "#",
    //         icon: PieChart,
    //     },
    //     {
    //         name: "Travel",
    //         url: "#",
    //         icon: Map,
    //     },
    // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props} collapsible="icon">
            <SidebarHeader>

                {/* <SidebarMenu>
                    <SidebarMenuItem>
                       
                    </SidebarMenuItem>
                </SidebarMenu> */}
            </SidebarHeader>
            <SidebarContent className="no-scrollbar">

                <NavMain items={data.invoices} />
                {/* <NavProjects projects={data.projects}/>
                <NavSecondary items={data.navSecondary} className="mt-auto"/> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
