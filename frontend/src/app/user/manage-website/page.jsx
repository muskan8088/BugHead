'use client';
import { IconPencilCheck, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ManageWebsite = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [websiteList, setWebsiteList] = useState([]);

    const fetchWebsites = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            console.log("Token being sent:", token);

            if (!token) {
                toast.error("No token found. Please login again.");
                setLoading(false);
                return;
            }

            const res = await axios.get("http://localhost:5000/website/getall", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setWebsiteList(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching websites:", error);
            toast.error("Failed to load websites");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWebsites();
    }, []);

    const deleteWebsite = async (websiteId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.delete(
                `http://localhost:5000/website/delete/${websiteId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.status === 200) {
                toast.success("Website deleted successfully");
                fetchWebsites(); // refresh after delete
            }
        } catch (err) {
            toast.error("Error deleting website");
            console.error("Delete error:", err);
        }
    };

    return (
        <div className="bg-slate-900 min-h-screen py-16 px-8 text-slate-300">
            <h1 className="text-center font-extrabold text-5xl text-white mb-10 tracking-wider">
                Manage Your Websites
            </h1>
            <div className="flex justify-center items-center">
                {loading ? (
                    <p className="text-slate-400 text-xl">Loading... Please wait...</p>
                ) : websiteList.length === 0 ? (
                    <div className="bg-slate-800 p-8 rounded-xl shadow-lg text-center max-w-lg w-full">
                        <p className="text-xl font-semibold text-slate-400">No websites found.</p>
                        <p className="mt-2 text-sm text-slate-500">Add a new website to get started.</p>
                    </div>
                ) : (
                    <div className="w-full max-w-5xl overflow-hidden rounded-xl shadow-2xl bg-slate-800 border border-slate-700">
                        <table className="min-w-full divide-y divide-slate-700">
                            <thead className="bg-slate-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Website
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Repository
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        GitHub Repo Link
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Registered at
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-slate-800 divide-y divide-slate-700">
                                {websiteList.map((site) => (
                                    <tr key={site._id} className="transition-all duration-300 hover:bg-slate-700">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{site.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400">
                                            <a href={site.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{site.website}</a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{site.repository}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400">
                                            <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:underline">{site.github}</a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                            {new Date(site.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex items-center space-x-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                                                    onClick={() => router.push(`/user/use-plugin/${site._id}`)}
                                                >
                                                    <IconPencilCheck size={20} />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="text-red-400 hover:text-red-300 transition-colors duration-200"
                                                    onClick={() => deleteWebsite(site._id)}
                                                >
                                                    <IconTrash size={20} />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageWebsite;