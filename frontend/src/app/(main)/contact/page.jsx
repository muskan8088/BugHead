"use client"; // needed because form will be interactive
import React, { useState } from "react";

const page = () => {
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // For now we just simulate form submission
        setStatus("Thank you! Your message has been sent.");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-6 py-12">
            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-8">
                <h1 className="text-4xl font-extrabold text-blue-600 mb-6 text-center">
                    Contact Us
                </h1>
                <p className="text-gray-700 mb-8 text-center">
                    Have questions or feedback? Reach out to us and we'll get back to you
                    as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows="6"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
                    >
                        Send Message
                    </button>
                </form>

                {status && (
                    <p className="mt-4 text-green-600 font-medium text-center">{status}</p>
                )}

                {/* Optional contact info */}
                <div className="mt-8 text-center text-gray-600 space-y-1">
                    <p>Email: support@bughead.com</p>
                    <p>Phone: +91 12345 67890</p>
                    <p>Address: 123 BugHead Street, Tech City</p>
                </div>
            </div>
        </section>
    );
};

export default page;
