"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { loginAction, type LoginState } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Loader2, AlertCircle } from "lucide-react";

const initialState: LoginState = {
  status: "idle",
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full h-12 bg-navy-900 hover:bg-navy-800 text-white rounded-lg font-semibold transition-all shadow-md"
    >
      {pending ? (
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
      ) : (
        "Sign In"
      )}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-navy-900">Admin Login</h1>
        <p className="text-neutral-500 text-sm mt-1">
          Enter your credentials to access the CMS.
        </p>
      </div>

      {state.status === "error" && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3 text-red-800 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
          <p>{state.message}</p>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-navy-900">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full h-12 px-4 rounded-lg border border-neutral-300 bg-neutral-50 focus:bg-white focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
            placeholder="admin@example.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-semibold text-navy-900">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full h-12 px-4 rounded-lg border border-neutral-300 bg-neutral-50 focus:bg-white focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
          />
        </div>

        <div className="pt-4">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
