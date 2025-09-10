'use client';
import React, { useState } from 'react';

// Sidebar is in src/components/Sidebar.jsx
import Sidebar from '../../../components/Sidebar';

// ManageWebsite is in src/app/user/manage-website/page.jsx
import ManageWebsite from '../manage-website/page';

// WebsiteSignup is the form component (we'll import it here)
import WebsiteSignup from '../add-website/page';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("websites");

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Content */}
            <main className="flex-1 p-8">
                {activeTab === "websites" && <ManageWebsite />}
                {activeTab === "add-website" && <WebsiteSignup />}
                {activeTab === "profile" && (
                    <h2 className="text-2xl font-bold text-gray-700">
                        Profile Section (coming soon)
                    </h2>
                )}
                {activeTab === "plugin" && (
                    <h2 className="text-2xl font-bold text-gray-700">
                        Generate Plugin (coming soon)
                    </h2>
                )}
                {activeTab === "bugs" && (
                    <h2 className="text-2xl font-bold text-gray-700">
                        Reported Bugs (coming soon)
                    </h2>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
