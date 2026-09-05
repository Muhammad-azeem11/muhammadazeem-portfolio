"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export type LoginState = {
  status: "idle" | "error" | "success";
  message: string;
};

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");
  const callbackUrl = formData.get("callbackUrl") || "/admin";

  const parsed = loginSchema.safeParse({ email, password });
  if (!parsed.success) {
    return { status: "error", message: "Invalid email or password" };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: callbackUrl as string,
    });
    return { status: "success", message: "Success" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", message: "Invalid credentials." };
        default:
          return { status: "error", message: "Something went wrong." };
      }
    }
    throw error;
  }
}
