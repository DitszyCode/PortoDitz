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
    <main className="mx-auto mt-16 flex w-[92%] flex-col items-center justify-center pb-16 sm:mt-20 md:mt-24 md:pb-20 lg:max-w-[1212.8px] lg:pb-24">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 w-full sm:mb-10 md:mb-12"
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
        className="mb-10 text-center sm:mb-12 md:mb-16"
      >
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-7xl">
          All{" "}
          <span className="text-foreground/30">Projects</span>
        </h1>
        <p className="mt-2 text-xs font-semibold text-foreground/50 sm:mt-3 sm:text-sm md:mt-4 md:text-base">
          {projects.length} projects in total
        </p>
      </motion.div>

      {/* Project Grid - 1 column like original */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid w-full grid-cols-1 gap-4 sm:gap-5 md:grid-cols-1 md:gap-6"
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
