'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bug, X, Copy } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'next/navigation';

const ManageWebsite = () => {
    const { id } = useParams();
    const [website, setWebsite] = useState(null);
    const [bugs, setBugs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pluginCode, setPluginCode] = useState('');
    const [user, setUser] = useState(null);

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) {
            toast.error("You must be logged in to view this page.");
            setLoading(false);
            return;
        }

        try {
            // Fetch the logged-in user's data
            const userRes = await axios.get(`${BACKEND_URL}/user/getuser`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userData = userRes.data;
            setUser(userData);

            // Fetch the specific website details
            const websiteRes = await axios.get(`${BACKEND_URL}/website/getbyid/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const websiteData = websiteRes.data;
            setWebsite(websiteData);

            // Fetch the issues (bugs) for this specific website
            const bugsRes = await axios.get(`${BACKEND_URL}/issue/getbywebsiteid/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBugs(bugsRes.data);

            // Generate the correct plugin code for your React app
            generatePluginCode(userData._id, websiteData._id);

        } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to load website data. Please ensure you are logged in and the URL is correct.');
        } finally {
            setLoading(false);
        }
    };

    const generatePluginCode = (userId, websiteId) => {
        // This script will configure the global object and then load your plugin
        const scriptCode = `
<script>
  window.bugHeadConfig = {
    userId: "${userId}",
    websiteId: "${websiteId}"
  };
</script>
<script src="path/to/your/plugin/dist/main.js" defer></script>
        `;
        setPluginCode(scriptCode);
    };

    const copyToClipboard = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(pluginCode).then(() => {
                toast.success("Code copied to clipboard!");
            }).catch(err => {
                console.error('Could not copy text: ', err);
                toast.error("Failed to copy code.");
            });
        } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = pluginCode;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            toast.success("Code copied to clipboard (fallback).");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-slate-100 to-slate-300 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
                <span className="text-xl text-gray-700 dark:text-gray-300 animate-pulse">Loading...</span>
            </div>
        );
    }

    if (!website) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-slate-100 to-slate-300 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
                <h1 className="text-3xl font-extrabold text-red-500 drop-shadow-lg">Website not found.</h1>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Please check the URL or ensure the website exists.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-slate-100 to-slate-300 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 py-12 px-2 md:px-8 flex flex-col items-center">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="w-full max-w-5xl">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight drop-shadow-lg">
                    Manage Website: <span className="text-blue-600 dark:text-blue-400">{website.name}</span>
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 font-medium">
                    Welcome, here you can view the bugs for your website and get the plugin code to integrate it into your site.
                </p>

                {/* Plugin Code Section */}
                <div className="bg-slate-900/95 dark:bg-gray-800/95 rounded-2xl shadow-2xl p-8 mb-12 border border-slate-700 dark:border-gray-700 relative">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                            <Bug className="w-7 h-7 text-yellow-400" /> Bug Reporting Plugin
                        </h2>
                        <button
                            onClick={copyToClipboard}
                            className="py-2 px-5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-md hover:from-blue-700 hover:to-blue-600 transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <Copy className="w-5 h-5" /> Copy Code
                        </button>
                    </div>
                    <p className="text-sm text-slate-300 mb-4">
                        Copy and paste the following HTML code snippet just before the closing <span className="font-mono bg-slate-800 px-1 rounded">&lt;/body&gt;</span> tag of your website.<br />
                        <span className="text-blue-300">Remember to replace <span className="font-mono">path/to/your/plugin/dist/main.js</span> with the actual path to your compiled plugin file.</span>
                    </p>
                    <div className="relative bg-slate-800 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-blue-100 font-mono border border-slate-700">
                        <pre><code>{pluginCode}</code></pre>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full flex items-center mb-12">
                    <div className="flex-grow border-t border-slate-300 dark:border-slate-700"></div>
                    <span className="mx-4 text-slate-400 dark:text-slate-500 font-semibold tracking-widest text-xs uppercase">Bugs</span>
                    <div className="flex-grow border-t border-slate-300 dark:border-slate-700"></div>
                </div>

                {/* Bug List Section */}
                <div className="bg-slate-900/95 dark:bg-gray-800/95 rounded-2xl shadow-2xl p-8 border border-slate-700 dark:border-gray-700">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                        <Bug className="w-6 h-6 text-yellow-400" /> Reported Bugs
                    </h2>
                    {bugs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {bugs.map((bug) => (
                                <div
                                    key={bug._id}
                                    className="bg-slate-800 dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-slate-700 dark:border-gray-800 transition-all duration-200 hover:scale-[1.025] hover:shadow-2xl group"
                                >
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-200">
                                        {bug.title}
                                    </h3>
                                    <p className="text-slate-200 dark:text-slate-300 mb-3">{bug.issueDescription}</p>
                                    <div className="mt-2 text-xs text-slate-400 dark:text-slate-500 space-y-1">
                                        <p><span className="font-semibold text-slate-300">Category:</span> {bug.category}</p>
                                        <p><span className="font-semibold text-slate-300">Browser:</span> {bug.browser}</p>
                                        <p><span className="font-semibold text-slate-300">OS:</span> {bug.os}</p>
                                        <p><span className="font-semibold text-slate-300">Date:</span> {new Date(bug.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-slate-400 dark:text-slate-500 py-12">
                            <Bug size={48} className="mx-auto mb-4 text-slate-500 dark:text-slate-600 animate-bounce" />
                            <p className="text-lg font-medium">No bugs have been reported for this website yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageWebsite;