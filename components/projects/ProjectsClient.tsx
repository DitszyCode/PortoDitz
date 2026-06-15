"use client"

import { projects } from "@/lib/projectData"
import ProjectCard from "./ProjectCard"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import MagneticEffect from "../providers/MagneticEffect"
import { Button } from "../ui/button"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function ProjectsClient() {
  const router = useRouter()

  return (
    <main className="mx-auto flex w-[90%] flex-col items-center justify-center lg:max-w-[1212.8px] mt-24 pb-24">
      
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full mb-12"
      >
        <MagneticEffect>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/#projects")}
            className="flex items-center gap-2 rounded-full"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Button>
        </MagneticEffect>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-16 text-center"
      >
        <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl">
          All{" "}
          <span className="text-foreground/30">Projects</span>
        </h1>
        <p className="mt-4 text-sm font-semibold text-foreground/50">
          {projects.length} projects in total
        </p>
      </motion.div>

      {/* Project Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2"
      >
        {projects.map((project, index) => (
          <motion.div key={index} variants={itemVariants}>
            <ProjectCard
              title={project.title}
              description={project.description}
              image={project.image}
              tech={project.tech}
              repo={project.repo}
              projectLink={project.linkProject}
            />
          </motion.div>
        ))}
      </motion.div>

    </main>
  )
}