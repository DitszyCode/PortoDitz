import { Metadata } from "next"
import ProjectsClient from "@/components/projects/ProjectsClient"

export const metadata: Metadata = {
  title: "All Projects",
  description: "Semua project yang pernah saya buat",
}

export default function ProjectsPage() {
  return <ProjectsClient />
}