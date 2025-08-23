"use client";
import { useState, useEffect } from "react"; 
import { usePathname } from "next/navigation";
import { TbLayoutDashboard, TbReportSearch } from "react-icons/tb";
import Topbar from '@/components/layout/Topbar';
import Sidebar from '@/components/layout/Sidebar';
import { FaNutritionix } from 'react-icons/fa';
import { PiUsersThree } from 'react-icons/pi';
import { MdOutlineManageAccounts, MdOutlineRestaurantMenu } from 'react-icons/md';


const menuItems = [
  { label: "Dashboard", href: "/", icon: <TbLayoutDashboard size={20} /> },
  { label: "Clients & Plants", href: "/clients-&-plants", icon: <PiUsersThree size={20} /> },
  { label: "Customer Management", href: "/customer-management", icon: <MdOutlineManageAccounts size={20} /> },
  { label: "Weekly Menu", href: "/weekly-menu", icon: <MdOutlineRestaurantMenu size={20} /> },
  { label: "Nutrition Info", href: "/nutrition-info", icon: <FaNutritionix size={20} /> },
  { label: "Reports", href: "/reports", icon: <TbReportSearch size={20} /> },
];
const settingMenu = [
  { label: "Profile", href: "/settings/profile" },
  { label: "About Us", href: "/settings/about-us" },
  { label: "Terms & Condition", href: "/settings/terms" },
  { label: "Privacy Policy", href: "/settings/privacy-policy" },
];

export default function MainRouteLayout({ children }) {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

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
    );
}