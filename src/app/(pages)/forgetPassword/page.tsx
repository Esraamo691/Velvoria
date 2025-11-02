"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
});

type FormFields = z.infer<typeof formSchema>;

export default function forgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: FormFields) {
    if (!values.email) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email }),
        }
      );

      const data = await res.json();
      console.log("Forgot response:", data);

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      router.push(`/forgetPassword/verifyCode?email=${values.email}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center gap-8 mb-10">
      <h1 className="text-[18px] font-semibold mb-3 text-center text-[#615c48]">
        Enter your email to continue
      </h1>
      <Card className="p-6 w-sm text-[#615c48]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full text-[#cfc9ab]  bg-[#433f32]"
            >
              {isLoading && <Loader2 className="animate-spin mr-2" />}
              Send Code
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
