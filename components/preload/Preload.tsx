import { cn } from "@/lib/utils"
import { useRef } from "react"
import useIsomorphicLayoutEffect from "@/hooks/UseIsomorphicLayoutEffect"
import gsap from "gsap"
import { motion } from "framer-motion"
import { Logo } from "@/components/LogoIcon"

interface PreloadProps {
  endedLoading: boolean
}

export default function Preload({ endedLoading }: PreloadProps) {
  const counterRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const counter = counterRef.current

    if (counter) {
      gsap.to(counter, {
        innerHTML: 100,
        duration: 3,
        ease: "power1.out",
        onUpdate: () => {
          counter.innerHTML = `${Math.floor(parseInt(counter.innerHTML))}%`
        },
      })
    }
  }, [endedLoading])

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-black transition-all duration-700 ease-in-out",
        endedLoading && "opacity-0 pointer-events-none"
      )}
    >
      <div className="relative flex flex-col items-center justify-center gap-2">
        {/* Logo/Globe - smaller on mobile */}
        <div className="scale-50 sm:scale-75 md:scale-100">
          <Logo />
        </div>

        {/* TEKS - Bigger on mobile */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-center text-base font-semibold tracking-[0.2em] text-white/70 sm:text-lg md:text-xl"
          >
            CODING WITH
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="text-center text-4xl font-black tracking-wider text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            ADITYA
          </motion.h1>
        </div>
      </div>

      {/* Counter persentase - Bigger on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center font-mono text-4xl font-semibold text-white/80 sm:text-5xl md:text-6xl lg:text-7xl"
        ref={counterRef}
      >
        0%
      </motion.div>
    </div>
  )
}
