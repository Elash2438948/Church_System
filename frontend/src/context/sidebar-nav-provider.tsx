// context/SidebarNavContext.tsx
import React, { createContext, useContext, useState } from "react"

type NavItem = {
    title: string
    url: string
    parent?: string
}

type SidebarNavContextType = {
    activeItem: NavItem | null
    setActiveItem: (item: NavItem) => void
}

const SidebarNavContext = createContext<SidebarNavContextType | undefined>(undefined)

export const SidebarNavProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeItem, setActiveItem] = useState<NavItem | null>(null)

    return (
        <SidebarNavContext.Provider value={{ activeItem, setActiveItem }}>
            {children}
        </SidebarNavContext.Provider>
    )
}

export const useSidebarNav = (): SidebarNavContextType => {
    const context = useContext(SidebarNavContext)
    if (!context) {
        throw new Error("useSidebarNav must be used within a SidebarNavProvider")
    }
    return context
}
