import React from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  let { register, handleSubmit, errors, onLogin, navigate } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>

        <p className="text-gray-500 text-center mb-6">Login to your account</p>

        <form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-black font-semibold cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
