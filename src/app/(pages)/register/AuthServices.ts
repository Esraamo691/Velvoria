import type { RegisterFormData } from "./RegisterSchema";

interface RegisterResponse {
  message?: string;
  error?: string;
  [key: string]: any;
}

export async function sendRegisterData(
  userData: RegisterFormData
): Promise<RegisterResponse> {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    // Handle non-2xx responses
    if (!res.ok) {
      return {
        error: data.message || "Something went wrong",
      };
    }

    return data; // success case
  } catch (err: any) {
    return {
      error: err?.message || "Network error occurred",
    };
  }
}
