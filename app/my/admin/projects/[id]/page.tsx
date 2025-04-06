"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Input,
  Textarea,
  Checkbox,
  Chip,
  Card,
  Select,
  SelectItem,
  Divider
} from "@heroui/react";
import { Save, ArrowLeft, Trash2 } from "lucide-react";
import { adminFetch } from "@/utils/api";

interface Project {
  id: string;
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

export async function generateStaticParams() {
  try {
    const response = await fetch(`/api/projects`);
    const projects = await response.json();
    return projects.map((project: any) => ({ id: project.id }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

const ProjectPage = ({ params }: { params: { id: string } }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [newTech, setNewTech] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await adminFetch(`/api/admin/projects?id=${params.id}`);

        // Format dates for input fields
        if (data.startDate) {
          data.startDate = new Date(data.startDate).toISOString().split('T')[0];
        }
        if (data.endDate) {
          data.endDate = new Date(data.endDate).toISOString().split('T')[0];
        }

        setProject(data);
      } catch (error) {
        console.error("Error fetching project:", error);
        if (error instanceof Error && error.message === "Authentication token not found") {
          router.push("/my/admin/login");
          return;
        }
        setError("Failed to load project data");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProject(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setProject(prev => prev ? { ...prev, [name]: checked } : null);
  };

  const handleSelectChange = (name: string, value: string) => {
    setProject(prev => prev ? { ...prev, [name]: value } : null);
  };

  const addTechnology = () => {
    if (!newTech.trim() || !project) return;

    const updatedTech = [...project.technologies, newTech.trim()];
    setProject({ ...project, technologies: updatedTech });
    setNewTech("");
  };

  const removeTechnology = (tech: string) => {
    if (!project) return;

    const updatedTech = project.technologies.filter(t => t !== tech);
    setProject({ ...project, technologies: updatedTech });
  };

  const handleSave = async () => {
    if (!project) return;

    setSaving(true);
    setError("");

    try {
      await adminFetch("/api/admin/projects", {
        method: "PUT",
        body: JSON.stringify(project),
      });

      // Navigate back to projects list after successful update
      router.push("/my/admin/projects");
    } catch (error) {
      console.error("Error updating project:", error);
      if (error instanceof Error && error.message === "Authentication token not found") {
        router.push("/my/admin/login");
        return;
      }
      setError(error instanceof Error ? error.message : "Failed to update project");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!project || !confirm("Are you sure you want to delete this project?")) return;

    try {
      await adminFetch("/api/admin/projects", {
        method: "DELETE",
        body: JSON.stringify({ id: project.id }),
      });

      // Navigate back to projects list after successful deletion
      router.push("/my/admin/projects");
    } catch (error) {
      console.error("Error deleting project:", error);
      if (error instanceof Error && error.message === "Authentication token not found") {
        router.push("/my/admin/login");
        return;
      }
      setError(error instanceof Error ? error.message : "Failed to delete project");
    }
  };

  if (loading) {
    return <div className="p-6">Loading project data...</div>;
  }

  if (error && !project) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!project) {
    return <div className="p-6">Project not found</div>;
  }

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
          <h1 className="text-2xl font-bold">Edit Project</h1>
        </div>
        <div className="flex gap-2">
          <Button
            color="danger"
            variant="light"
            onPress={handleDelete}
            startContent={<Trash2 size={18} />}
          >
            Delete
          </Button>
          <Button
            color="primary"
            onPress={handleSave}
            isLoading={saving}
            startContent={<Save size={18} />}
          >
            Save Changes
          </Button>
        </div>
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

            <Select
              label="Project Type"
              name="projectType"
              selectedKeys={[project.projectType]}
              onChange={(e) => handleSelectChange("projectType", e.target.value)}
              fullWidth
            >
              <SelectItem key="PROFESSIONAL" >Professional</SelectItem>
              <SelectItem key="CASUAL">Casual</SelectItem>
            </Select>

            <Select
              label="Status"
              name="status"
              selectedKeys={[project.status]}
              onChange={(e) => handleSelectChange("status", e.target.value)}
              fullWidth
            >
              <SelectItem key="PLANNED" >Planned</SelectItem>
              <SelectItem key="IN_PROGRESS" >In Progress</SelectItem>
              <SelectItem key="COMPLETED" >Completed</SelectItem>
              <SelectItem key="ARCHIVED" >Archived</SelectItem>
            </Select>

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

export default ProjectPage;
