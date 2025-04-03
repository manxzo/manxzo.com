"use client";

import { useState } from "react";
import { Card } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Lock, Mail, Key } from "lucide-react";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";

const CreateAdmin = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Validate passwords match
            if (password !== confirmPassword) {
                addToast({
                    title: "Error",
                    description: "Passwords do not match",
                    variant: "solid",
                    color: "danger"
                });
                return;
            }

            // Validate password strength
            if (password.length < 8) {
                addToast({
                    title: "Error",
                    description: "Password must be at least 8 characters long",
                    variant: "solid",
                    color: "danger"
                });
                return;
            }

            const response = await fetch('/api/admin/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    secretKey,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create admin account');
            }

            addToast({
                title: "Success",
                description: "Admin account created successfully",
                variant: "solid",
                color: "success"
            });

            // Redirect to login page
            router.push('/my');
        } catch (error) {
            addToast({
                title: "Error",
                description: error instanceof Error ? error.message : "Something went wrong",
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
                    <h2 className="text-2xl font-bold">Create Admin Account</h2>
                    <p className="text-default-500">This can only be done once</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
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

                    <Input
                        type="password"
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onValueChange={setConfirmPassword}
                        startContent={<Lock className="text-default-400" size={20} />}
                        isRequired
                    />

                    <Input
                        type="password"
                        label="Secret Key"
                        placeholder="Enter the secret key"
                        value={secretKey}
                        onValueChange={setSecretKey}
                        startContent={<Key className="text-default-400" size={20} />}
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
                        Create Admin Account
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default CreateAdmin; 