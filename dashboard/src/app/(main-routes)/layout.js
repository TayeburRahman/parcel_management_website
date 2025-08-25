"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { TbLayoutDashboard, TbReportSearch } from "react-icons/tb";
import Topbar from '@/components/layout/Topbar';
import Sidebar from '@/components/layout/Sidebar';
import { FaNutritionix } from 'react-icons/fa';
import { PiUsersThree } from 'react-icons/pi';
import { MdOutlineManageAccounts, MdOutlineRestaurantMenu } from 'react-icons/md';
import PrivateRoute from "@/components/privet-route/PrivetRoute";

const adminItems = [
    { label: "Dashboard", href: "/", icon: <TbLayoutDashboard size={20} /> },
    { label: "Agent Management", href: "/agent-management", icon: <PiUsersThree size={20} /> },
    { label: "Customer Management", href: "/customer-management", icon: <MdOutlineManageAccounts size={20} /> },
    { label: "Weekly Menu", href: "/weekly-menu", icon: <MdOutlineRestaurantMenu size={20} /> },
    { label: "Nutrition Info", href: "/nutrition-info", icon: <FaNutritionix size={20} /> },
    { label: "Reports", href: "/reports", icon: <TbReportSearch size={20} /> },
];

const customersItems = [
    { label: "Dashboard", href: "/", icon: <TbLayoutDashboard size={20} /> },
    { label: "Clients & Plants", href: "/clients-&-plants", icon: <PiUsersThree size={20} /> },
];

const agentItems = [
    { label: "Dashboard", href: "/", icon: <TbLayoutDashboard size={20} /> },
    { label: "Clients & Plants", href: "/clients-&-plants", icon: <PiUsersThree size={20} /> },
];

const settingMenu = [
    { label: "Profile", href: "/settings/profile" },
];

export default function MainRouteLayout({ children }) {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    const { user } = useSelector((state) => state.auth);

    let menuItems = [];
    let allowedRoles = [];

    if (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") {
        menuItems = adminItems;
        allowedRoles = ["ADMIN", "SUPER_ADMIN"];
    } else if (user?.role === "CUSTOMERS") {
        menuItems = customersItems;
        allowedRoles = ["CUSTOMERS"];
    } else if (user?.role === "AGENT") {
        menuItems = agentItems;
        allowedRoles = ["AGENT"];
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <PrivateRoute allowedRoles={allowedRoles}>
            <div className="min-h-screen flex relative">
                {/* Sidebar */}
                <Sidebar
                    menuItems={menuItems}
                    setSettingsOpen={setSettingsOpen}
                    settingsOpen={settingsOpen}
                    pathname={pathname}
                    settingMenu={settingMenu}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                <main
                    className={`flex-1 flex flex-col transition-all duration-300
                     ${isSidebarOpen && window.innerWidth < 768 ? 'overflow-hidden h-screen' : 'overflow-auto'}
                     md:overflow-auto md:h-auto`}
                >
                    {/* Top bar */}
                    <Topbar
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                    />

                    {/* Page content */}
                    <div className="bg-content-bg h-[calc(100vh-80px)] overflow-auto scrl-hide rounded-tl-sm p-3">
                        {children}
                    </div>
                </main>
            </div>
        </PrivateRoute>
    );
}
