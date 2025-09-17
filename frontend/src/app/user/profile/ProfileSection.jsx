"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const ProfileSection = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Get token from localStorage (or wherever you store it)
                const token = localStorage.getItem("token");

                const res = await axios.get("http://localhost:5000/user/getuser", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(res.data); // Axios automatically parses JSON
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return <p className="text-gray-500">Loading profile...</p>;
    }

    return (
        <div className="bg-white shadow rounded-2xl p-6 max-w-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Profile</h2>
            <div className="space-y-2">
                <p>
                    <span className="font-semibold">Name:</span> {user.name || "N/A"}
                </p>
                <p>
                    <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p>
                    <span className="font-semibold">Role:</span> {user.role || "User"}
                </p>
            </div>
        </div>
    );
};

export default ProfileSection;
