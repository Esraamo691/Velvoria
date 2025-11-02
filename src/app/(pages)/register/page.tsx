"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { schema, RegisterFormData } from "./RegisterSchema";
import { sendRegisterData } from "./AuthServices";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(data: RegisterFormData) {
    setLoading(true);
    setApiError(null);

    try {
      const res = await sendRegisterData(data);

      if (res.message === "success") {
        router.push("/login");
      } else {
        // Show backend error message if available
        setApiError(res.message || res.error || "Unexpected error occurred");
      }
    } catch (err: any) {
      setApiError(err?.message || "Network error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-amber-50 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Register Now
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" {...register("name")} />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="text" {...register("phone")} />
            {errors.phone && (
              <p className="text-red-600 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="rePassword">Re-enter Password</Label>
            <Input
              id="rePassword"
              type="password"
              {...register("rePassword")}
            />
            {errors.rePassword && (
              <p className="text-red-600 text-sm">
                {errors.rePassword.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className=" text-[#E8CFA8]; hover:underline">
              Sign In
            </a>
          </p>

          {apiError && (
            <p className="text-center text-red-600 font-medium mt-2">
              {apiError}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
