import { projects } from "@/lib/projectData"
import ProjectCard from "./ProjectCard"
import ProjectTitleAnimate from "./ProjectTitleAnimate"
import ProjectButton from "./ProjectButton"

export default function Projects() {
  const featuredProjects = projects.slice(0, 4)

  return (
    <section
      id="projects"
      className="relative z-[20] mx-auto mt-16 flex w-[92%] flex-col items-center justify-center sm:mt-20 md:mt-24 lg:max-w-[1212.8px]"
    >
      <ProjectTitleAnimate />
      <div className="mb-16 grid w-full grid-cols-1 gap-4 sm:gap-5 md:mb-20 md:gap-6 lg:mb-24 lg:max-w-[1200px]">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            tech={project.tech}
            repo={project.repo}
            projectLink={project.linkProject}
          />
        ))}
      </div>
      <ProjectButton />
    </section>
  )
}
