"use client";

import { useState, useEffect } from "react";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Lock, Mail } from "lucide-react";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { setToken, isAuthenticated } from "@/utils/auth";

const My = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to log in');
      }

      // Store the token
      setToken(data.token);

      addToast({
        title: "Success",
        description: "Welcome back!",
        variant: "solid",
        color: "success"
      });

      // Redirect to admin dashboard
      router.push('/admin/dashboard');
    } catch (error) {
      addToast({
        title: "Error",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "solid",
        color: "danger"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Admin Login</h2>
          <p className="text-default-500">Please sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onValueChange={setEmail}
            startContent={<Mail className="text-default-400" size={20} />}
            isRequired
          />

          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onValueChange={setPassword}
            startContent={<Lock className="text-default-400" size={20} />}
            isRequired
          />

          <Button
            type="submit"
            color="primary"
            variant="solid"
            size="lg"
            className="w-full"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default My;
