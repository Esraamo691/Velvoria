import * as z from "zod";

export const schema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),

    email: z
      .string()
      .nonempty("Email is required")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is invalid"
      ),

    phone: z
      .string()
      .nonempty("Phone is required")
      .regex(/^01[0-2,5]{1}[0-9]{8}$/, "Phone number is invalid"),

    password: z
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        "Password must include uppercase, lowercase, number, and special character"
      ),

    rePassword: z.string().nonempty("Re-enter Password is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords do not match",
  });

export type RegisterFormData = z.infer<typeof schema>;
