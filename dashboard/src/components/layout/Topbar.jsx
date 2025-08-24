"use client"; 
import { user } from '@/data/data';
import Image from 'next/image';
import Link from 'next/link';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoMenuOutline } from "react-icons/io5"; 
import { usePathname } from 'next/navigation'; 
import { useState, useEffect } from 'react'; 

const Topbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const pathname = usePathname();
    const [pageTitle, setPageTitle] = useState("Dashboard");

    // Define titles for different paths
    const getTitleFromPathname = (path) => {
        switch (path) {
            case '/':
                return 'Dashboard';
            case '/clients-&-plants':
                return 'Clients & Plants';
            case '/customer-management':
                return 'Customer Management';
            case '/weekly-menu':
                return 'Weekly Menu';
            case '/nutrition-info':
                return 'Nutrition Info';
            case '/reports':
                return 'Reports';
            case '/settings/profile':
                return 'Profile Settings';   
            default:
                if (path.startsWith('/settings')) {
                    return 'Settings';
                }
                return 'Dashboard';
        }
    };

    useEffect(() => {
        setPageTitle(getTitleFromPathname(pathname));
    }, [pathname]);

    return (
        <div className="bg-layout-bg h-20 flex items-center px-4 sticky top-0 z-30 justify-between md:justify-end">
            <div className="flex items-center gap-2 md:hidden">
                <button
                    className="p-2 text-gray-700"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <IoMenuOutline size={25} />
                </button>
                <h2 className="text-lg font-semibold text-gray-800">
                    {pageTitle}
                </h2>
            </div>
            {/* <h2 className="text-xl font-semibold text-gray-800 hidden md:block flex-grow text-center">
                {pageTitle}
            </h2> */}


            {/* Notification and User Info */}
            <div className="flex items-center space-x-4 pr-0 md:pr-12">
                <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer">
                    <Link href="/notification">
                        <IoMdNotificationsOutline color='#fff' size={16} />
                    </Link>
                </button>
                <Link href={"/settings/profile"}>
                    <Image
                        src={user?.profileImage || "/images/avatar.png"}
                        width={40}
                        height={40}
                        alt="User"
                        className="rounded-full w-10 h-10 cursor-pointer border-2 border-primary"
                        priority
                    />
                </Link>
                {/* User name hidden on small screens */}
                <span className="text-sm font-medium text-black hidden md:block">{user?.userName || "N/A"}</span>
            </div>
        </div>
    );
};

export default Topbar;