'use client';
import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import ManageWebsite from '../manage-website/page';
import WebsiteSignup from '../add-website/page';
import ProfileSection from '../profile/ProfileSection';
// import GeneratePluginPage from '../generate-plugin/page.jsx';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("websites");

    const handleLogout = () => {
        // Remove token and user data from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect the user to the login page
        window.location.href = '/login';
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0 bg-gray-800 bg-opacity-70 p-6 flex flex-col justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-8">Dashboard</h1>
                    <nav>
                        <ul>
                            <li className="mb-4">
                                <button
                                    className={`w-full text-left py-3 px-4 rounded-lg transition-transform transform hover:scale-105 ${activeTab === 'profile' ? 'bg-pink-500 text-white' : 'text-gray-300 hover:text-white'}`}
                                    onClick={() => setActiveTab('profile')}
                                >
                                    Profile
                                </button>
                            </li>
                            <li className="mb-4">
                                <button
                                    className={`w-full text-left py-3 px-4 rounded-lg transition-transform transform hover:scale-105 ${activeTab === 'websites' ? 'bg-pink-500 text-white' : 'text-gray-300 hover:text-white'}`}
                                    onClick={() => setActiveTab('websites')}
                                >
                                    Manage Websites
                                </button>
                            </li>
                            <li className="mb-4">
                                <button
                                    className={`w-full text-left py-3 px-4 rounded-lg transition-transform transform hover:scale-105 ${activeTab === 'add-website' ? 'bg-pink-500 text-white' : 'text-gray-300 hover:text-white'}`}
                                    onClick={() => setActiveTab('add-website')}
                                >
                                    Add Website
                                </button>
                            </li>
                            <li className="mb-4">
                                <button
                                    className={`w-full text-left py-3 px-4 rounded-lg transition-transform transform hover:scale-105 ${activeTab === 'bugs' ? 'bg-pink-500 text-white' : 'text-gray-300 hover:text-white'}`}
                                    onClick={() => setActiveTab('bugs')}
                                >
                                    Reported Bugs
                                </button>
                            </li>
                            {/* Logout button moved here */}
                            <li className="mb-4">
                                <button
                                    className="w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 text-red-400 hover:text-red-300 font-semibold"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
                {/* Removed the extra div for the button */}
                
            </div>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {activeTab === "websites" && <ManageWebsite />}
                {activeTab === "add-website" && <WebsiteSignup />}
                {activeTab === "profile" && <ProfileSection />}
                {activeTab === "bugs" && (
                    <div className="flex items-center justify-center h-full">
                        <h2 className="text-3xl font-bold text-white tracking-wider">
                            Reported Bugs (coming soon)
                        </h2>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;