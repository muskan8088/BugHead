"use client";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short !!")
    .max(30, "Too Long !!")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[^a-zA-Z0-9]/, "Password must contain a special character")
    .min(7, "Password must be at least 7 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match..!!"),
});

const Signup = () => {
  const router = useRouter();

  const signupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values, { resetForm }) => {
      axios
        .post("http://localhost:5000/user/add", values)
        .then(() => {
          toast.success("User registered successfully 🎉");
          resetForm();
          router.push("/login");
        })
        .catch(() => {
          toast.error("Something went wrong, please try again later");
        });
    },
    validationSchema: SignUpSchema,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-6">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl rounded-2xl p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white drop-shadow-md">Sign up</h1>
          <p className="mt-2 text-sm text-gray-200">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-yellow-300 font-semibold hover:underline"
            >
              Sign in here
            </a>
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={signupForm.handleSubmit} className="mt-6 space-y-4">
          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={signupForm.handleChange}
              value={signupForm.values.name}
              className="w-full px-4 py-3 rounded-lg border border-white/40 bg-white/20 text-white placeholder-gray-200 
              focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 outline-none transition-all"
              placeholder="Enter your name"
            />
            {signupForm.errors.name && signupForm.touched.name && (
              <p className="text-xs text-red-300 mt-1">
                {signupForm.errors.name}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={signupForm.handleChange}
              value={signupForm.values.email}
              className="w-full px-4 py-3 rounded-lg border border-white/40 bg-white/20 text-white placeholder-gray-200 
              focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 outline-none transition-all"
              placeholder="Enter your email"
            />
            {signupForm.errors.email && signupForm.touched.email && (
              <p className="text-xs text-red-300 mt-1">
                {signupForm.errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={signupForm.handleChange}
              value={signupForm.values.password}
              className="w-full px-4 py-3 rounded-lg border border-white/40 bg-white/20 text-white placeholder-gray-200 
              focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 outline-none transition-all"
              placeholder="Enter your password"
            />
            {signupForm.errors.password && signupForm.touched.password && (
              <p className="text-xs text-red-300 mt-1">
                {signupForm.errors.password}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              onChange={signupForm.handleChange}
              value={signupForm.values.confirmPassword}
              className="w-full px-4 py-3 rounded-lg border border-white/40 bg-white/20 text-white placeholder-gray-200 
              focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300 outline-none transition-all"
              placeholder="Re-enter your password"
            />
            {signupForm.errors.confirmPassword &&
              signupForm.touched.confirmPassword && (
                <p className="text-xs text-red-300 mt-1">
                  {signupForm.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold text-lg 
            bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 
            hover:opacity-90 focus:ring-4 focus:ring-yellow-200 transition-all"
          >
            Sign up 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
