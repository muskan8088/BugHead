"use client";
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const issueData = [
    { month: "Jan", issues: 12 },
    { month: "Feb", issues: 18 },
    { month: "Mar", issues: 10 },
    { month: "Apr", issues: 25 },
    { month: "May", issues: 20 },
    { month: "Jun", issues: 30 },
];

const pieData = [
    { name: "Open Issues", value: 40 },
    { name: "Closed Issues", value: 60 },
];

const COLORS = ["#EF4444", "#22C55E"];

const AboutPage = () => {
    return (
        <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen px-6 py-12">
            {/* Introduction Section */}
            <section className="flex flex-col items-center justify-center mb-16">
                <div className="max-w-3xl text-center">
                    <h1 className="text-5xl font-extrabold text-blue-600 mb-6 font-sans tracking-tight">
                        About BugHead
                    </h1>

                    <p className="text-lg text-gray-700 leading-relaxed mb-6 font-serif">
                        BugHead is a platform designed to simplify bug reporting and issue
                        tracking. Developers and testers can collaborate seamlessly, ensuring
                        faster debugging and smoother project management.
                    </p>

                    <p className="text-md text-gray-600 mb-10 font-mono">
                        🚀 With BugHead, reporting issues becomes quick, transparent, and
                        developer-friendly.
                    </p>

                    <a
                        href="https://github.com/your-username/your-repo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-xl shadow-lg hover:bg-blue-700 transition"
                    >
                        Visit Our GitHub
                    </a>
                </div>
            </section>

            {/* Dashboard Section */}
            <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                {/* Line Chart */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Issues Reported Over Time
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={issueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="issues"
                                stroke="#2563eb"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Issue Status
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                dataKey="value"
                                label
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </section>

            {/* Insights Section */}
            <section className="max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-6">
                <div className="bg-white shadow-md rounded-2xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-700">Total Issues</h3>
                    <p className="text-3xl font-bold text-blue-600">120+</p>
                </div>
                <div className="bg-white shadow-md rounded-2xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-700">Resolved</h3>
                    <p className="text-3xl font-bold text-green-600">90</p>
                </div>
                <div className="bg-white shadow-md rounded-2xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-700">Pending</h3>
                    <p className="text-3xl font-bold text-red-500">30</p>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
