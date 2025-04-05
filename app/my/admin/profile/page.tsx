"use client";

import { useState, useEffect } from "react";
import { Textarea, addToast, Button, Input, Tabs, Tab, Card } from "@heroui/react";
import { adminFetch } from "@/utils/api";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/utils/auth";
type Profile = {
  id: string;
  name: string;
  title: string;
  type: "CASUAL" | "PROFESSIONAL";
  bio: string;
  avatar?: string;
  location?: string;
  birthday?: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  discord?: string;
  telegram?: string;
  resumeUrl?: string;
};

const Dashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"casual" | "professional">("casual");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/my");
    }
  }, [router]);

  // Fetch profiles
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await fetch("/api/profile");
        const profiles = await data.json();
        setProfiles(profiles);
      } catch (error) {
        addToast({
          title: "Error",
          description: "Failed to fetch profiles",
          variant: "solid",
          color: "danger",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const currentProfile = profiles.find(
    (profile) => profile.type.toLowerCase() === activeTab
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());

      // Format birthday as ISO-8601 if it exists
      if (data.birthday) {
        data.birthday = new Date(data.birthday as string).toISOString();
      }

      if (currentProfile) {
        // Update existing profile
        await adminFetch(`/api/admin/profile`, {
          method: "PUT",
          body: JSON.stringify({
            id: currentProfile.id,
            ...data,
            type: activeTab.toUpperCase(),
          }),
        });
      } else {
        // Create new profile
        await adminFetch(`/api/admin/profile`, {
          method: "POST",
          body: JSON.stringify({
            ...data,
            type: activeTab.toUpperCase(),
          }),
        });
      }

      addToast({
        title: "Success",
        description: "Profile saved successfully",
        variant: "solid",
        color: "success",
      });

      // Refresh profiles
      const updatedProfiles = await fetch("/api/profile");
      const profiles = await updatedProfiles.json();
      setProfiles(profiles);
    } catch (error) {
      addToast({
        title: "Error",
        description: "Failed to save profile",
        variant: "solid",
        color: "danger",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Profile Dashboard</h1>

      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as "casual" | "professional")}
      >
        <Tab key="casual" title="Casual Profile">
          <Card className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4 p-4">
              <Input
                name="name"
                label="Name"
                defaultValue={currentProfile?.name}
                required
              />
              <Input
                name="title"
                label="Title"
                defaultValue={currentProfile?.title}
                required
              />
              <Textarea
                name="bio"
                label="Bio"
                defaultValue={currentProfile?.bio}
                required
              />
              <Input
                name="avatar"
                label="Avatar URL"
                defaultValue={currentProfile?.avatar}
              />
              <Input
                name="location"
                label="Location"
                defaultValue={currentProfile?.location}
              />
              <Input
                name="birthday"
                label="Birthday"
                type="date"
                defaultValue={currentProfile?.birthday}
              />
              <Input
                name="email"
                label="Email"
                type="email"
                defaultValue={currentProfile?.email}
                required
              />
              <Input
                name="phoneNumber"
                label="Phone Number"
                defaultValue={currentProfile?.phoneNumber}
              />
              <Input
                name="address"
                label="Address"
                defaultValue={currentProfile?.address}
              />
              <Input
                name="github"
                label="GitHub"
                defaultValue={currentProfile?.github}
              />
              <Input
                name="linkedin"
                label="LinkedIn"
                defaultValue={currentProfile?.linkedin}
              />
              <Input
                name="website"
                label="Website"
                defaultValue={currentProfile?.website}
              />
              <Input
                name="discord"
                label="Discord"
                defaultValue={currentProfile?.discord}
              />
              <Input
                name="telegram"
                label="Telegram"
                defaultValue={currentProfile?.telegram}
              />
              <Input
                name="resumeUrl"
                label="Resume URL"
                defaultValue={currentProfile?.resumeUrl}
              />
              <Button type="submit" isLoading={isSaving}>
                Save Profile
              </Button>
            </form>
          </Card>
        </Tab>
        <Tab key="professional" title="Professional Profile">
          <Card className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4 p-4">
              <Input
                name="name"
                label="Name"
                defaultValue={currentProfile?.name}
                required
              />
              <Input
                name="title"
                label="Title"
                defaultValue={currentProfile?.title}
                required
              />
              <Textarea
                name="bio"
                label="Bio"
                defaultValue={currentProfile?.bio}
                required
              />
              <Input
                name="avatar"
                label="Avatar URL"
                defaultValue={currentProfile?.avatar}
              />
              <Input
                name="location"
                label="Location"
                defaultValue={currentProfile?.location}
              />
              <Input
                name="birthday"
                label="Birthday"
                type="date"
                defaultValue={currentProfile?.birthday}
              />
              <Input
                name="email"
                label="Email"
                type="email"
                defaultValue={currentProfile?.email}
                required
              />
              <Input
                name="phoneNumber"
                label="Phone Number"
                defaultValue={currentProfile?.phoneNumber}
              />
              <Input
                name="address"
                label="Address"
                defaultValue={currentProfile?.address}
              />
              <Input
                name="github"
                label="GitHub"
                defaultValue={currentProfile?.github}
              />
              <Input
                name="linkedin"
                label="LinkedIn"
                defaultValue={currentProfile?.linkedin}
              />
              <Input
                name="website"
                label="Website"
                defaultValue={currentProfile?.website}
              />
              <Input
                name="discord"
                label="Discord"
                defaultValue={currentProfile?.discord}
              />
              <Input
                name="telegram"
                label="Telegram"
                defaultValue={currentProfile?.telegram}
              />
              <Input
                name="resumeUrl"
                label="Resume URL"
                defaultValue={currentProfile?.resumeUrl}
              />
              <Button type="submit" isLoading={isSaving}>
                Save Profile
              </Button>
            </form>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Dashboard;
