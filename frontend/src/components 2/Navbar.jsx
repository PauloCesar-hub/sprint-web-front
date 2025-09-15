import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function ThemeToggle(){
  const getInitial = () => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved) return saved
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } catch { return 'light' }
  }
  const [theme, setTheme] = useState(getInitial)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="px-3 py-2 rounded-lg text-sm font-medium border border-slate-300/60 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
      aria-label="Alternar tema"
      title="Alternar tema"
    >
      {theme === 'light' ? '🌙 Escuro' : '☀️ Claro'}
    </button>
  )
}

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      'px-3 py-2 rounded-lg text-sm font-medium transition ' +
      (isActive ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800')
    }
  >
    {children}
  </NavLink>
)

export default function Navbar(){
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 border-b border-slate-200/70 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Logo sempre visível no canto superior esquerdo e volta para a Home */}
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Ir para a página inicial">
          <img src="/assets/logo.png" alt="Passa a Bola" className="h-10 w-10 rounded-full object-cover ring-1 ring-black/5 dark:ring-white/10" />
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-1 mr-2">
            <NavItem to="/noticias">Notícias</NavItem>
            <NavItem to="/jogos">Jogos</NavItem>
            <NavItem to="/tabelas">Tabela</NavItem>
            <NavItem to="/artilharia">Artilharia</NavItem>
</nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}