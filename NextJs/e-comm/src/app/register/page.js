"use client";

import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const Page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      
      <Card className="w-full max-w-md rounded-2xl border shadow-xl">
        <CardContent className="p-8">
          
          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground">
              Create Account
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Register your new account
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">

            {/* Name */}
            <div className="space-y-2">
              <Label>Name</Label>

              <Input
                type="text"
                placeholder="Enter your name"
              />
            </div>
            
            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                type="email"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>

              <Input
                type="password"
                placeholder="Create password"
              />
            </div>

            {/* Button */}
            <Button className="w-full rounded-xl">
              Register
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;