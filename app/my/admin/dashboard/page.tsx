"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardHeader, Spacer, Divider, Spinner, Button, Chip } from "@heroui/react";

import {
    FileText,
    MessageSquare,
    Briefcase,
    Award,
    Bookmark,
    Code
} from "lucide-react";
import { adminFetch } from "@/utils/api";

interface DashboardData {
    postsCount: number;
    newMessagesCount: number;
    projectsCount: number;
    certificationsCount: number;
    experiencesCount: number;
    skillsCount: number;
}

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<DashboardData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const dashboard = await adminFetch("/api/admin/dashboard", {
                    method: "GET",
                });
                setData(dashboard);
            } catch (err) {
                setError("Failed to load dashboard data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return (
            <Card className="max-w-4xl mx-auto">
                <CardBody className="p-8 text-center">
                    <p className="text-red-500 text-lg">{error}</p>
                    <Spacer y={4} />
                    <Button onPress={() => window.location.reload()}>Retry</Button>
                </CardBody>
            </Card>
        );
    }

    if (loading || !data) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Spinner size="lg" color="primary" />
            </div>
        );
    }

    const statCards = [
        {
            title: "Posts",
            value: data.postsCount,
            icon: <FileText className="w-5 h-5" />,
            href: "/my/admin/posts",
            color: "primary"
        },
        {
            title: "Unread Messages",
            value: data.newMessagesCount,
            icon: <MessageSquare className="w-5 h-5" />,
            badge: data.newMessagesCount > 0 ? data.newMessagesCount : null,
            href: "/my/admin/messages",
            color: "warning"
        },
        {
            title: "Projects",
            value: data.projectsCount,
            icon: <Briefcase className="w-5 h-5" />,
            href: "/my/admin/projects",
            color: "success"
        },
        {
            title: "Certifications",
            value: data.certificationsCount,
            icon: <Award className="w-5 h-5" />,
            href: "/my/admin/certifications",
            color: "secondary"
        },
        {
            title: "Experience",
            value: data.experiencesCount,
            icon: <Bookmark className="w-5 h-5" />,
            href: "/my/admin/experience",
            color: "danger"
        },
        {
            title: "Skills",
            value: data.skillsCount,
            icon: <Code className="w-5 h-5" />,
            href: "/my/admin/skills",
            color: "default"
        },
    ];

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-gray-500 mt-1">Overview of your site content</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {statCards.map((card, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardHeader className="flex justify-between items-center px-6 py-4">
                            <div className="flex items-center gap-2">
                                <div className={`p-2 rounded-md bg-${card.color}-100`}>
                                    {card.icon}
                                </div>
                                <h3 className="text-lg font-semibold">{card.title}</h3>
                            </div>
                            {card.badge && (
                                <Chip color="warning" variant="flat" size="sm">
                                    {card.badge} new
                                </Chip>
                            )}
                        </CardHeader>
                        <Divider />
                        <CardBody className="px-6 py-8">
                            <p className="text-4xl font-bold text-center">{card.value}</p>
                        </CardBody>
                        <Divider />
                        <CardFooter className="px-6 py-4">
                            <Button
                                fullWidth
                                color={card.color as any}
                                variant="flat"
                                onPress={() => window.location.href = card.href}
                            >
                                View {card.title}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
