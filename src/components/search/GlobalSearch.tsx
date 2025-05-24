'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaTimes, FaCode, FaUser, FaEnvelope, FaProjectDiagram } from 'react-icons/fa'
import { proyectos } from '@/data/proyectos'
import { Habilidad as HabilidadType, categoriasHabilidades } from '@/data/habilidades'
import Link from 'next/link'

interface SearchResult {
  id: string
  title: string
  description: string
  type: 'project' | 'skill' | 'page'
  url: string
  icon: React.ReactNode
}

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Datos de búsqueda
  const searchData: SearchResult[] = [
    // Páginas
    {
      id: 'home',
      title: 'Inicio',
      description: 'Página principal con información general',
      type: 'page',
      url: '/',
      icon: <FaUser />
    },
    {
      id: 'projects',
      title: 'Proyectos',
      description: 'Galería de proyectos desarrollados',
      type: 'page',
      url: '/proyectos',
      icon: <FaProjectDiagram />
    },
    {
      id: 'skills',
      title: 'Habilidades',
      description: 'Tecnologías y herramientas que domino',
      type: 'page',
      url: '/habilidades',
      icon: <FaCode />
    },
    {
      id: 'about',
      title: 'Sobre Mí',
      description: 'Mi historia y experiencia profesional',
      type: 'page',
      url: '/sobremi',
      icon: <FaUser />
    },
    {
      id: 'contact',
      title: 'Contacto',
      description: 'Formulario de contacto y redes sociales',
      type: 'page',
      url: '/contacto',
      icon: <FaEnvelope />
    },
    
    // Proyectos
    ...proyectos.map(proyecto => ({
      id: `project-${proyecto.id}`,
      title: proyecto.titulo,
      description: proyecto.descripcion,
      type: 'project' as const,
      url: `/proyectos/${proyecto.id}`,
      icon: <FaProjectDiagram />
    })),    // Habilidades
    ...categoriasHabilidades.flatMap((categoria) => 
      categoria.habilidades.map((habilidad: HabilidadType) => ({
        id: `skill-${habilidad.nombre}`,
        title: habilidad.nombre,
        description: `Habilidad en ${habilidad.nombre}`,
        type: 'skill' as const,
        url: '/habilidades',
        icon: <FaCode />
      }))
    )
  ]

  // Función de búsqueda
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const filtered = searchData.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 8) // Limitar a 8 resultados

    setResults(filtered)
    setSelectedIndex(0)
  }

  useEffect(() => {
    performSearch(query)
  }, [performSearch, query])

  // Navegación por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(true)
      }

      if (e.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
      }

      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : 0
          )
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : results.length - 1
          )
        }

        if (e.key === 'Enter' && results[selectedIndex]) {
          window.location.href = results[selectedIndex].url
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project': return 'text-blue-400'
      case 'skill': return 'text-emerald-400'
      case 'page': return 'text-purple-400'
      default: return 'text-gray-400'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'project': return 'Proyecto'
      case 'skill': return 'Habilidad'
      case 'page': return 'Página'
      default: return 'Resultado'
    }
  }

  return (
    <>
      {/* Botón de búsqueda */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg text-gray-400 hover:text-white hover:border-emerald-500/50 transition-all duration-200"
        aria-label="Abrir búsqueda global"
      >
        <FaSearch className="w-4 h-4" />
        <span className="hidden sm:inline">Buscar...</span>
        <kbd className="hidden sm:inline text-xs bg-neutral-700 px-1.5 py-0.5 rounded">
          Ctrl+K
        </kbd>
      </button>

      {/* Modal de búsqueda */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-start justify-center pt-[10vh] px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-700">
                  <FaSearch className="w-5 h-5 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Buscar proyectos, habilidades, páginas..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                </div>

                {/* Resultados */}
                <div className="max-h-96 overflow-y-auto">
                  {query && results.length === 0 && (
                    <div className="px-4 py-8 text-center text-gray-400">
                      <FaSearch className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      No se encontraron resultados para &quot;{query}&quot;
                    </div>
                  )}

                  {results.map((result, index) => (
                    <Link
                      key={result.id}
                      href={result.url}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 border-b border-neutral-800 last:border-b-0 transition-colors ${
                        index === selectedIndex 
                          ? 'bg-emerald-500/10 border-emerald-500/20' 
                          : 'hover:bg-neutral-800/50'
                      }`}
                    >
                      <div className={`w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-800 ${getTypeColor(result.type)}`}>
                        {result.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-white truncate">
                            {result.title}
                          </h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full bg-neutral-800 ${getTypeColor(result.type)}`}>
                            {getTypeLabel(result.type)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 truncate">
                          {result.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Footer */}
                {results.length > 0 && (
                  <div className="px-4 py-2 border-t border-neutral-700 text-xs text-gray-400 flex items-center justify-between">
                    <span>Navega con ↑↓ • Selecciona con ↵</span>
                    <span>ESC para cerrar</span>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
