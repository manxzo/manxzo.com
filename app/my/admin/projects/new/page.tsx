"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Input,
  Textarea,
  Checkbox,
  Chip,
  Card,
  Divider
} from "@heroui/react";
import { Save, ArrowLeft } from "lucide-react";
import { adminFetch } from "@/utils/api";

interface ProjectForm {
  title: string;
  description: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  projectType: "PROFESSIONAL" | "CASUAL";
  status: "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED";
  featured: boolean;
  startDate?: string;
  endDate?: string;
}

const initialProject: ProjectForm = {
  title: "",
  description: "",
  technologies: [],
  projectType: "PROFESSIONAL",
  status: "IN_PROGRESS",
  featured: false,
};

const NewProject = () => {
  const [project, setProject] = useState<ProjectForm>(initialProject);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [newTech, setNewTech] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setProject(prev => ({ ...prev, [name]: checked }));
  };

  const addTechnology = () => {
    if (!newTech.trim()) return;

    const updatedTech = [...project.technologies, newTech.trim()];
    setProject({ ...project, technologies: updatedTech });
    setNewTech("");
  };

  const removeTechnology = (tech: string) => {
    const updatedTech = project.technologies.filter(t => t !== tech);
    setProject({ ...project, technologies: updatedTech });
  };

  const handleSave = async () => {
    if (!project.title || !project.description) {
      setError("Title and description are required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await adminFetch("/api/admin/projects", {
        method: "POST",
        body: JSON.stringify(project),
      });

      // Navigate back to projects list after successful creation
      router.push("/my/admin/projects");
    } catch (error) {
      console.error("Error creating project:", error);
      if (error instanceof Error && error.message === "Authentication token not found") {
        router.push("/my/admin/login");
        return;
      }
      setError(error instanceof Error ? error.message : "Failed to create project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            variant="light"
            isIconOnly
            onPress={() => router.push("/my/admin/projects")}
          >
            <ArrowLeft size={18} />
          </Button>
          <h1 className="text-2xl font-bold">Create New Project</h1>
        </div>
        <Button
          color="primary"
          onPress={handleSave}
          isLoading={saving}
          startContent={<Save size={18} />}
        >
          Save Project
        </Button>
      </div>

      {error && (
        <div className="p-4 text-white bg-red-500 rounded">{error}</div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

          <div className="space-y-4">
            <Input
              label="Project Title"
              name="title"
              value={project.title}
              onChange={handleChange}
              fullWidth
              required
            />

            <Textarea
              label="Description"
              name="description"
              value={project.description}
              onChange={handleChange}
              minRows={3}
              fullWidth
              required
            />

            <Input
              label="Image URL"
              name="image"
              value={project.image || ""}
              onChange={handleChange}
              fullWidth
            />

            <div className="space-y-2">
              <label htmlFor="projectType" className="block text-sm font-medium">Project Type</label>
              <select
                id="projectType"
                name="projectType"
                value={project.projectType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="PROFESSIONAL">Professional</option>
                <option value="CASUAL">Casual</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium">Status</label>
              <select
                id="status"
                name="status"
                value={project.status}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="PLANNED">Planned</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div className="flex items-center">
              <Checkbox
                id="featured"
                isSelected={project.featured}
                onValueChange={(checked) => handleCheckboxChange("featured", checked)}
              />
              <label htmlFor="featured" className="ml-2">Featured Project</label>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Additional Details</h2>

          <div className="space-y-4">
            <Input
              label="GitHub URL"
              name="githubUrl"
              value={project.githubUrl || ""}
              onChange={handleChange}
              fullWidth
            />

            <Input
              label="Live URL"
              name="liveUrl"
              value={project.liveUrl || ""}
              onChange={handleChange}
              fullWidth
            />

            <Input
              label="Start Date"
              name="startDate"
              type="date"
              value={project.startDate || ""}
              onChange={handleChange}
              fullWidth
            />

            <Input
              label="End Date"
              name="endDate"
              type="date"
              value={project.endDate || ""}
              onChange={handleChange}
              fullWidth
            />

            <Divider className="my-4" />

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Technologies</h3>
              <div className="flex gap-2 flex-wrap mb-2">
                {project.technologies.map((tech) => (
                  <Chip
                    key={tech}
                    onClose={() => removeTechnology(tech)}
                  >
                    {tech}
                  </Chip>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add technology"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTechnology();
                    }
                  }}
                />
                <Button onPress={addTechnology}>Add</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NewProject;
