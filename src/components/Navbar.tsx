"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Home, Image as ImageIcon, Layers, Phone, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "@/context/ThemeContext"

const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'Gallery', url: '/gallery', icon: ImageIcon },
  { name: 'Services', url: '/services', icon: Layers },
  { name: 'Contact', url: '/contact', icon: Phone }
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div
        style={{ background: 'var(--nav-bg)', borderColor: 'var(--nav-border)' }}
        className="flex items-center gap-1 backdrop-blur-md border py-1.5 px-1.5 rounded-full shadow-2xl transition-all duration-300"
      >
        {/* Theme toggle */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{ background: 'var(--toggle-bg)', color: 'var(--toggle-text)', borderColor: 'var(--nav-border)' }}
          className="relative flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300"
        >
          <motion.span
            key={theme}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            {theme === 'dark' ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
          </motion.span>
        </motion.button>

        {/* Divider */}
        <div style={{ background: 'var(--nav-border)' }} className="w-px h-5 mx-1 rounded-full" />

        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.url || (item.url !== '/' && pathname.startsWith(item.url))
          return (
            <Link
              key={item.name}
              href={item.url}
              style={{ color: isActive ? 'var(--nav-text-active)' : 'var(--nav-text)' }}
              className="relative cursor-pointer text-sm font-medium px-6 py-2 rounded-full transition-colors duration-300"
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden"><Icon size={18} strokeWidth={2.5} /></span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full rounded-full -z-10"
                  style={{ background: 'var(--gold-muted)' }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full" style={{ background: 'var(--gold)' }}>
                    <div className="absolute w-12 h-6 rounded-full blur-md -top-2 -left-2" style={{ background: 'var(--gold-muted)' }} />
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
