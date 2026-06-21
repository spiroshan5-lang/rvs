"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Home, Image as ImageIcon, Layers, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'Gallery', url: '/gallery', icon: ImageIcon },
  { name: 'Services', url: '/services', icon: Layers },
  { name: 'Contact', url: '/contact', icon: Phone }
]

export default function Navbar() {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 bg-[#111111]/90 backdrop-blur-md border border-[#333333] py-1.5 px-1.5 rounded-full shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.url || (item.url !== '/' && pathname.startsWith(item.url))

          return (
            <Link
              key={item.name}
              href={item.url}
              className={cn(
                "relative cursor-pointer text-sm font-medium px-6 py-2 rounded-full transition-colors",
                "text-white/60 hover:text-white",
                isActive && "text-white",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-white/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full">
                    <div className="absolute w-12 h-6 bg-white/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-white/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
