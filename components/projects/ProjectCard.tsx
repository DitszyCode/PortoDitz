import { GithubIcon, LinkIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react"
import {
  projectCardAnimation,
  projectCardDescriptionAnimation,
  projectCardImageAnimation,
  projectCardLinksAnimation,
  projectCardTechAnimation,
  projectCardTitleAnimation,
} from "./animationCard"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  tech: string[]
  repo: string
  projectLink: string
}

export default function ProjectCard({
  title,
  description,
  image,
  tech,
  repo,
  projectLink,
}: ProjectCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const ctrls = useAnimation()

  useEffect(() => {
    if (isInView) {
      ctrls.start("visible")
    }
  }, [ctrls, isInView])

  return (
    <motion.div
      ref={ref}
      animate={ctrls}
      initial="hidden"
      variants={projectCardAnimation}
      aria-hidden="true"
      className="relative z-10 w-full overflow-hidden border border-foreground/20 bg-zinc-200 dark:bg-zinc-800 lg:rounded-3xl"
    >
      {/* ===== MOBILE LAYOUT (< lg) ===== */}
      <div className="flex flex-col lg:hidden">
        {/* Image on top */}
        <motion.div
          variants={projectCardImageAnimation}
          className="relative h-44 w-full bg-zinc-300 dark:bg-zinc-700"
        >
          <Image
            width={800}
            height={400}
            src={image}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Content below */}
        <div className="flex flex-col gap-2 p-4">
          {/* Links */}
          <motion.div variants={projectCardLinksAnimation} className="flex items-center gap-2">
            <Link href={repo} target="_blank" className="rounded-full bg-foreground p-2 hover:bg-foreground/50">
              <GithubIcon className="h-4 w-4 text-zinc-100 dark:text-zinc-800" />
            </Link>
            <Link href={projectLink} target="_blank" className="rounded-full bg-foreground p-2 hover:bg-foreground/50">
              <LinkIcon className="h-4 w-4 text-zinc-100 dark:text-zinc-800" />
            </Link>
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground">
            <motion.span variants={projectCardTitleAnimation}>{title}</motion.span>
          </h3>

          {/* Description */}
          <p className="line-clamp-2 text-xs text-foreground/50">
            <motion.span variants={projectCardDescriptionAnimation}>{description}</motion.span>
          </p>

          {/* Tech */}
          <motion.div variants={projectCardTechAnimation} className="mt-2 flex flex-wrap gap-2">
            {tech.map((tech, index) => (
              <p key={index} className="rounded-full bg-foreground/10 px-2.5 py-1 text-[10px] font-medium text-foreground/70">
                {tech}
              </p>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ===== DESKTOP LAYOUT (lg+) - ORIGINAL ===== */}
      <div className="hidden h-[550px] lg:flex lg:items-stretch lg:justify-center">
        {/* Image - original style */}
        <motion.div
          variants={projectCardImageAnimation}
          className="absolute -bottom-2 right-0 w-[85%] object-contain md:w-[60%] lg:max-w-[55%]"
        >
          <Image
            width={1000}
            height={600}
            src={image}
            alt={title}
            className="w-full object-contain"
            loading="lazy"
          />
        </motion.div>

        {/* Action Links - original position */}
        <motion.div
          variants={projectCardLinksAnimation}
          className="absolute left-0 top-0 ml-8 mt-6 flex items-center justify-center gap-4 lg:ml-14 lg:mt-10"
        >
          <Link href={repo} target="_blank" className="rounded-full bg-foreground p-2 transition-all duration-300 ease-in-out hover:bg-foreground/50">
            <GithubIcon className="h-6 w-6 text-zinc-100 dark:text-zinc-800 md:h-8 md:w-8 lg:h-10 lg:w-10" />
          </Link>
          <Link href={projectLink} target="_blank" className="rounded-full bg-foreground p-2 transition-all duration-300 ease-in-out hover:bg-foreground/50">
            <LinkIcon className="h-6 w-6 text-zinc-100 dark:text-zinc-800 md:h-8 md:w-8 lg:h-10 lg:w-10" />
          </Link>
        </motion.div>

        {/* Content - original position */}
        <div className="absolute left-10 top-32 mb-10 ml-0 text-foreground lg:top-52 lg:mb-14 lg:ml-4">
          <h3 className="max-w-[90%] text-5xl font-bold leading-none text-foreground md:text-4xl md:leading-none lg:max-w-[450px] lg:text-5xl lg:leading-none">
            <motion.span variants={projectCardTitleAnimation}>{title}</motion.span>
          </h3>
          <p className="mt-4 w-[90%] max-w-[454px] text-xs font-semibold text-foreground/50 md:text-sm lg:text-base">
            <motion.span variants={projectCardDescriptionAnimation}>{description}</motion.span>
          </p>
          <motion.div variants={projectCardTechAnimation} className="mt-9 flex gap-4">
            {tech.map((tech, index) => (
              <p key={index} className="text-xs font-semibold text-foreground/50 md:text-sm">
                {tech}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
