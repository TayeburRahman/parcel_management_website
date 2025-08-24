"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { LuLogOut, LuSettings } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Logout } from "@/redux/features/auth/authSlice";

const Sidebar = ({ menuItems, setSettingsOpen, settingsOpen, pathname, settingMenu, isSidebarOpen, setIsSidebarOpen }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(Logout());
    };

    const handleLinkClick = () => {
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <>
            {isSidebarOpen && window.innerWidth < 768 && (
                <motion.div
                    className="fixed inset-0 bg-black/50 bg-opacity-50 z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar content */}
            <motion.div
                initial={false}
                animate={isSidebarOpen ? "open" : "closed"}
                variants={{
                    open: { x: 0 },
                    closed: { x: "-100%" }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`fixed inset-y-0 left-0 z-50 w-56 flex flex-col justify-between pb-10 bg-layout-bg transform md:relative md:translate-x-0 md:flex`}
            >
                <div>
                    {/* Logo */}
                    <Link href="/" onClick={handleLinkClick}>
                        <div className="flex items-center justify-center min-h-[70px]">
                            <Image className="h-10 w-40" src="/images/logo.png" width={500} height={500} alt="Logo" priority />
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-2 px-2 mt-10">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={handleLinkClick}
                                    className={`px-4 py-2 rounded-sm transition-all duration-300 ${isActive
                                        ? "bg-primary text-white"
                                        : "text-black bg-[#FEFEFE]"
                                        }`}
                                >
                                    <span className='flex text-xs items-center gap-2 font-medium'>
                                        {item.icon}
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}

                        {/* Settings dropdown */}
                        <div>
                            <button
                                onClick={() => setSettingsOpen(!settingsOpen)}
                                className={`w-full rounded-sm cursor-pointer text-left px-4 py-2 text-black flex justify-between items-center transition-all duration-300 ${settingsOpen ? "bg-primary text-white" : "bg-[#FEFEFE]"}`}
                            >
                                <p className='flex items-center gap-2 text-xs font-medium'>
                                    <LuSettings size={20} />
                                    <span>Settings</span>
                                </p>
                                <span className="text-xs">{settingsOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>
                            </button>

                            <AnimatePresence initial={false}>
                                {settingsOpen && (
                                    <motion.div
                                        className="flex flex-col gap-1 text-[15px] mt-1 pr-5"
                                        initial={{ opacity: 0, y: -10, height: 0 }}
                                        animate={{ opacity: 1, y: 0, height: "auto" }}
                                        exit={{ opacity: 0, y: -10, height: 0 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        {settingMenu.map((item) => {
                                            const isActive = pathname === item.href;
                                            return (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    onClick={handleLinkClick}
                                                    className={`px-4 py-2 text-xs rounded-sm transition-colors duration-200 font-medium ${isActive
                                                        ? "bg-primary text-white font-medium"
                                                        : "text-black bg-white"
                                                        }`}
                                                >
                                                    {item.label}
                                                </Link>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </nav>
                </div>

                <button onClick={handleLogout} className="text-[#E72A11] bg-[#FEFEFE] text-xs py-2 mx-2 flex gap-2 pl-10 rounded-sm items-center cursor-pointer">
                    <LuLogOut size={20} />
                    <span className='text-md font-medium'>Log out</span>
                </button>
            </motion.div>
        </>
    );
};

export default Sidebar;