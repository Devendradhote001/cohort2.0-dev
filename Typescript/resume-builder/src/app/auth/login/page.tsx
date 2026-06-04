"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { loginApi } from "@/apis/auth.api";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>();

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      await loginApi(data);

      router.push("/resume");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-12 text-white flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            AI Resume Builder
          </h1>

          <p className="mt-4 text-violet-100">
            Build professional resumes powered by AI.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            Welcome Back
          </h2>

          <p className="mt-4 text-violet-100">
            Continue building your ATS-friendly
            resume.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
          <h2 className="text-3xl font-bold text-slate-800">
            Login 👋
          </h2>

          <p className="text-slate-500 mt-2">
            Access your resume dashboard.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
          >
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
                ? "Logging In..."
                : "Login"}

              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-6 text-center text-slate-500">
            Don't have an account?
            <Link
              href="/auth/register"
              className="ml-2 text-violet-600 font-semibold"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}