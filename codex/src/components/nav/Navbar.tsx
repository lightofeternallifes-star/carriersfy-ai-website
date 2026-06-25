import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Employees', href: '/employees' },
  { label: 'Team', href: '/team' },
  { label: 'Apps', href: '/apps' },
  { label: 'Portal', href: '/portal' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={
          scrolled
            ? { background: 'rgba(7,11,22,0.92)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }
            : {}
        }
      >
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,56px)] py-[18px] flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 no-underline text-white">
            <div className="w-10 h-10 rounded-xl gradient-cta flex items-center justify-center font-grotesk font-bold text-[#070B16] text-sm">
              CF
            </div>
            <span className="font-grotesk font-semibold text-[18px] tracking-[0.04em]">
              CARRIERSFY <span className="text-cf-red font-bold">AI</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="text-[rgba(244,246,251,0.62)] hover:text-white no-underline text-[14.5px] font-medium transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/build/employee"
              className="hidden md:inline-flex items-center no-underline text-[#070B16] font-bold text-sm px-5 py-2.5 rounded-[12px] gradient-cta shadow-[0_6px_24px_rgba(28,127,214,0.35)] hover:opacity-90 transition-opacity"
            >
              Build Employee
            </Link>
            {/* Mobile burger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 rounded-[12px] bg-white/[0.06] border border-white/[0.12] text-white cursor-pointer flex items-center justify-center flex-col gap-1"
              aria-label="Menu"
            >
              <span className="w-4 h-[1.6px] bg-white block" />
              <span className="w-4 h-[1.6px] bg-white block" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[80] flex flex-col p-7"
          style={{ background: 'rgba(7,11,22,0.96)', backdropFilter: 'blur(24px)' }}
        >
          <div className="flex justify-between items-center mb-12">
            <span className="font-grotesk font-semibold text-[18px]">CARRIERSFY AI</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 rounded-[12px] bg-white/[0.06] border border-white/[0.12] text-white text-xl cursor-pointer flex items-center justify-center"
            >
              ×
            </button>
          </div>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="text-white no-underline font-grotesk text-3xl font-medium py-4 border-b border-white/[0.08]"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/build/employee"
            className="mt-8 text-center no-underline text-[#070B16] font-bold text-base py-4 rounded-[14px] gradient-cta"
          >
            Build Your AI Employee
          </Link>
        </div>
      )}
    </>
  )
}
