"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Chip,
  Tooltip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from "@heroui/react";
import { Edit, Trash2, Plus } from "lucide-react";
import { getToken } from "@/utils/auth";
import { adminFetch } from "@/utils/api";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  projectType: "PROFESSIONAL" | "CASUAL";
  status: "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED";
  featured: boolean;
}

const statusColorMap = {
  PLANNED: "warning",
  IN_PROGRESS: "primary",
  COMPLETED: "success",
  ARCHIVED: "default",
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await adminFetch("/api/admin/projects");

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await adminFetch("/api/admin/projects", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error("Failed to delete project");

      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  if (loading) {
    return <div>Loading projects...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button
          color="primary"
          onPress={() => router.push("/my/admin/projects/new")}
          startContent={<Plus size={18} />}
        >
          New Project
        </Button>
      </div>

      <Table aria-label="Projects table">
        <TableHeader>
          <TableColumn>TITLE</TableColumn>
          <TableColumn>TYPE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>FEATURED</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.title}</TableCell>
              <TableCell>
                <Chip variant="flat">{project.projectType}</Chip>
              </TableCell>
              <TableCell>
                <Chip color={statusColorMap[project.status] as any}>{project.status}</Chip>
              </TableCell>
              <TableCell>
                {project.featured ? (
                  <Chip color="success">Yes</Chip>
                ) : (
                  <Chip>No</Chip>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Tooltip content="Edit project">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => router.push(`/my/admin/projects/${project.id}`)}
                    >
                      <Edit size={18} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete project">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="danger"
                      onPress={() => handleDelete(project.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Projects;
