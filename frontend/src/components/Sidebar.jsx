'use client';
import React from 'react';
import { User, Plug, Bug, LayoutDashboard, LogOut, PlusCircle } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { key: "profile", label: "Profile", icon: <User size={18} /> },
        { key: "websites", label: "Manage Websites", icon: <LayoutDashboard size={18} /> },
        { key: "add-website", label: "Add Website", icon: <PlusCircle size={18} /> },
        { key: "plugin", label: "Generate Plugin", icon: <Plug size={18} /> },
        { key: "bugs", label: "Reported Bugs", icon: <Bug size={18} /> },
        { key: "logout", label: "Logout", icon: <LogOut size={18} /> },
    ];

    return (
        <aside className="w-64 bg-white shadow-md border-r border-gray-200">
            <div className="p-6">
                <h1 className="text-xl font-bold text-pink-600">BugHead Dashboard</h1>
            </div>
            <ul>
                {menuItems.map(item => (
                    <li
                        key={item.key}
                        className={`px-6 py-3 flex items-center gap-3 cursor-pointer hover:bg-pink-100 transition ${
                            activeTab === item.key
                                ? "bg-pink-200 text-pink-700 font-semibold"
                                : "text-gray-700"
                        }`}
                        onClick={() => {
                            if (item.key === "logout") {
                                localStorage.removeItem("token"); // clear JWT
                                window.location.href = "/login"; // redirect to login
                            } else {
                                setActiveTab(item.key);
                            }
                        }}
                    >
                        {item.icon}
                        {item.label}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
