"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import { registerApi } from "@/apis/auth.api";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormData>();

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    try {
      await registerApi(data);

      router.push("/auth/login");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Section */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-12 text-white flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            AI Resume Builder
          </h1>

          <p className="mt-4 text-violet-100">
            Create ATS-optimized resumes with AI.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            Build Your Professional Resume
          </h2>

          <p className="mt-4 text-violet-100">
            Generate summaries, skills,
            experiences and ATS reports instantly.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
          <h2 className="text-3xl font-bold text-slate-800">
            Create Account 🚀
          </h2>

          <p className="text-slate-500 mt-2">
            Start building your resume.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="block mb-2 text-sm font-medium">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  {...register("name", {
                    required: "Name is required",
                  })}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none"
                />
              </div>

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  {...register("email", {
                    required: "Email is required",
                  })}
                  placeholder="john@example.com"
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none"
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message:
                        "Minimum 6 characters required",
                    },
                  })}
                  placeholder="********"
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none"
                />
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              disabled={isSubmitting}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              {isSubmitting
                ? "Creating Account..."
                : "Create Account"}

              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-6 text-center text-slate-500">
            Already have an account?
            <Link
              href="/auth/login"
              className="ml-2 text-violet-600 font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}