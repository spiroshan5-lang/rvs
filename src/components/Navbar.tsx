"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Image as ImageIcon, Layers, Phone, Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "@/context/ThemeContext"
import Image from "next/image"

const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'Gallery', url: '/gallery', icon: ImageIcon },
  { name: 'Services', url: '/services', icon: Layers },
  { name: 'Contact', url: '/contact', icon: Phone },
  { name: 'Socials', url: '/social', icon: Layers }
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { setIsOpen(false) }, [pathname])

  if (!mounted) return null;

  return (
    <>
      {/* ─── DESKTOP NAV PILL ─── */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <div
          style={{ background: 'var(--nav-bg)', borderColor: 'var(--nav-border)' }}
          className="flex items-center gap-1 backdrop-blur-md border py-1.5 px-1.5 rounded-full shadow-2xl transition-all duration-300"
        >
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{ background: 'var(--toggle-bg)', color: 'var(--toggle-text)', borderColor: 'var(--nav-border)' }}
            className="relative flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 cursor-pointer"
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

          <div style={{ background: 'var(--nav-border)' }} className="w-px h-5 mx-1 rounded-full" />

          {navItems.map((item) => {
            const isActive = pathname === item.url || (item.url !== '/' && pathname.startsWith(item.url))
            return (
              <Link
                key={item.name}
                href={item.url}
                style={{ color: isActive ? 'var(--nav-text-active)' : 'var(--nav-text)' }}
                className="relative cursor-pointer text-sm font-medium px-6 py-2 rounded-full transition-colors duration-300"
              >
                <span>{item.name}</span>
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

      {/* ─── MOBILE HEADER — theme-aware glassmorphism ─── */}
      <header
        style={{
          background: theme === 'light'
            ? 'rgba(247, 244, 239, 0.72)'
            : 'rgba(11, 11, 11, 0.72)',
          borderColor: 'var(--gold-border)',
          backdropFilter: 'blur(20px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
        }}
        className="fixed top-0 left-0 right-0 h-20 px-6 z-40 flex items-center justify-between border-b md:hidden transition-all duration-300"
      >
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border flex-shrink-0" style={{ borderColor: 'var(--gold-border)', background: 'var(--bg-card)' }}>
            <Image src="/new-logo.jpeg" alt="RVS Crafted Interiors Logo" fill className="object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm tracking-wider leading-none whitespace-nowrap" style={{ color: 'var(--fg)' }}>RVS Crafted Interiors</span>
            <span className="font-sans text-[7px] tracking-[0.2em] uppercase mt-1 whitespace-nowrap" style={{ color: 'var(--gold)' }}>Spatial Architecture Studio</span>
          </div>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
          className="p-2 cursor-pointer focus:outline-none transition-colors duration-200 hover:text-[var(--gold)]"
          style={{ color: 'var(--fg)' }}
        >
          <Menu size={24} />
        </button>
      </header>

      {/* ─── MOBILE DRAWER — glassmorphism overlay ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col md:hidden"
            style={{
              background: theme === 'light'
                ? 'rgba(247, 244, 239, 0.92)'
                : 'rgba(11, 11, 11, 0.95)',
              backdropFilter: 'blur(32px) saturate(1.8)',
              WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
            }}
          >
            {/* Drawer Header */}
            <div className="h-20 px-6 flex items-center justify-between border-b" style={{ borderColor: 'var(--gold-border)' }}>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border flex-shrink-0" style={{ borderColor: 'var(--gold-border)', background: 'var(--bg-card)' }}>
                  <Image src="/new-logo.jpeg" alt="RVS Crafted Interiors Logo" fill className="object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-sm tracking-wider leading-none whitespace-nowrap" style={{ color: 'var(--fg)' }}>RVS Crafted Interiors</span>
                  <span className="font-sans text-[7px] tracking-[0.2em] uppercase mt-1 whitespace-nowrap" style={{ color: 'var(--gold)' }}>Spatial Architecture Studio</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close Navigation Menu"
                className="p-2 cursor-pointer focus:outline-none transition-colors duration-200 hover:text-[var(--gold)]"
                style={{ color: 'var(--fg)' }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
              <nav className="flex flex-col items-center space-y-8 mb-12">
                {navItems.map((item, idx) => {
                  const isActive = pathname === item.url || (item.url !== '/' && pathname.startsWith(item.url))
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08, duration: 0.4 }}
                    >
                      <Link
                        href={item.url}
                        onClick={() => setIsOpen(false)}
                        className="text-2xl font-serif tracking-widest relative py-1"
                        style={{ color: isActive ? 'var(--gold)' : 'var(--fg)' }}
                      >
                        {item.name}
                        {isActive && (
                          <span
                            className="absolute bottom-0 left-0 right-0 h-[1px] w-full"
                            style={{ background: 'var(--gold)' }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.08, duration: 0.4 }}
                className="w-full max-w-[280px]"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-3 backdrop-blur-md rounded-full py-4 text-center group cursor-pointer transition-all duration-300 w-full"
                  style={{ background: 'rgba(61,36,16,0.85)', border: '1px solid var(--gold-border)', color: '#F5F5F0' }}
                >
                  <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-[2px] group-hover:translate-x-[2px] transition-transform" strokeWidth={1.5} />
                  <span className="text-sm tracking-wider font-sans font-semibold uppercase">Book Now</span>
                </Link>
              </motion.div>
            </div>

            {/* Drawer Footer / Theme Toggle */}
            <div className="p-8 border-t flex justify-between items-center" style={{ borderColor: 'var(--gold-border)' }}>
              <span className="font-sans text-[10px] tracking-widest uppercase" style={{ color: 'var(--fg)', opacity: 0.4 }}>Theme Curation</span>
              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.95 }}
                style={{ background: 'var(--toggle-bg)', color: 'var(--toggle-text)', borderColor: 'var(--nav-border)' }}
                className="relative flex items-center justify-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun size={14} strokeWidth={2} />
                    <span className="text-[10px] tracking-wider uppercase font-semibold">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon size={14} strokeWidth={2} />
                    <span className="text-[10px] tracking-wider uppercase font-semibold">Dark Mode</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
