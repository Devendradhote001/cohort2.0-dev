"use client";

import Link from "next/link";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

const Page = () => {
  let { hydrateUser } = useAuth();
  let router = useRouter();

  const [formData, setFormData] = useState({});
  console.log(formData);

  let handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await api.post("/api/auth/login", formData);
      hydrateUser();
    } catch (error) {
      console.log("error in login", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md rounded-2xl border shadow-xl">
        <CardContent className="p-8">
          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Login to continue to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                name="email"
                onChange={handleChange}
                type="email"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>

              <Input
                name={"password"}
                onChange={handleChange}
                type="password"
                placeholder="Enter your password"
              />
            </div>

            {/* Button */}
            <Button className="w-full rounded-xl">Login</Button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
