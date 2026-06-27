/* eslint-disable react-hooks/set-state-in-effect, @typescript-eslint/no-unused-vars */
"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Image as ImageIcon, Layers, Phone, Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "@/context/ThemeContext"
import Image from "next/image"

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
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => { setIsOpen(false) }, [pathname])

  if (!mounted) return null;

  return (
    <>
      {/* â”€â”€â”€ DESKTOP NAV PILL â”€â”€â”€ */}
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

          <div style={{ background: 'var(--nav-border)' }} className="w-px h-5 mx-1 rounded-full" />

          {/* Desktop WhatsApp CTA */}
          <a
            href="https://wa.me/919591685465?text=Hi!%20I%27m%20interested%20in%20interior%20design%20services%20from%20RVS%20Craft%20Interiors.%20Could%20you%20share%20more%20details%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:opacity-90 cursor-pointer"
            style={{ background: 'var(--gold)', color: '#0B0B0B' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3.5 h-3.5"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span>Book Now</span>
          </a>
        </div>
      </div>

      {/* â”€â”€â”€ MOBILE HEADER â€” theme-aware glassmorphism â”€â”€â”€ */}
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

      {/* â”€â”€â”€ MOBILE DRAWER â€” glassmorphism overlay â”€â”€â”€ */}
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
                <a
                  href="https://wa.me/919591685465?text=Hi!%20I%27m%20interested%20in%20interior%20design%20services%20from%20RVS%20Craft%20Interiors.%20Could%20you%20share%20more%20details%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-3 backdrop-blur-md rounded-full py-4 text-center group cursor-pointer transition-all duration-300 w-full"
                  style={{ background: 'var(--gold)', border: '1px solid var(--gold-border)', color: '#0B0B0B' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span className="text-sm tracking-wider font-sans font-semibold uppercase">Book Now</span>
                </a>
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

