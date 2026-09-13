"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "@/actions/auth";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signIn(new FormData(e.currentTarget));
    } catch (err: any) {
      setError(err.message || "Authentication failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-neutral-900 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <img src="/logo.svg" alt="Next Solution" className="mx-auto h-12 w-auto" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Login</h1>
          <p className="text-sm text-gray-500 dark:text-neutral-400">
            Sign in to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-neutral-200 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="block w-full rounded-lg border border-gray-200 dark:border-neutral-700 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 dark:focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-orange-500"
              placeholder="admin@nextsolution.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-neutral-200 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                className="block w-full rounded-lg border border-gray-200 dark:border-neutral-700 px-3 py-2.5 pr-10 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 dark:focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-orange-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:hover:text-neutral-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-blue-600 dark:bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 dark:hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isLoading ? "Please wait..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 dark:text-neutral-500">
          Use the admin credentials stored on the server (ADMIN_BOOTSTRAP_EMAIL / ADMIN_BOOTSTRAP_PASSWORD).
        </p>
      </div>
    </div>
  );
}