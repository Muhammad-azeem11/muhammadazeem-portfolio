import { LoginForm } from "@/components/forms/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
