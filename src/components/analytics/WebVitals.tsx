'use client'

import { useEffect } from 'react'
import { useReportWebVitals } from 'next/web-vitals'

interface WebVitalsData {
  id: string
  name: string
  label: string
  value: number
}

// Performance Memory interface
interface PerformanceMemory {
  usedJSHeapSize: number
  totalJSHeapSize: number
  jsHeapSizeLimit: number
}

// Extend Performance interface
interface PerformanceWithMemory extends Performance {
  memory?: PerformanceMemory
}

export default function WebVitals() {
  useReportWebVitals((metric: WebVitalsData) => {
    // Enviar métricas a tu servicio de analytics preferido
    if (process.env.NODE_ENV === 'production') {
      // Google Analytics
      if (window.gtag) {
        window.gtag('event', metric.name, {
          custom_map: { metric_id: 'dimension1' },
          metric_id: metric.id,
          metric_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          metric_delta: metric.value,
        })
      }

      // También puedes enviar a otros servicios como Vercel Analytics, DataDog, etc.
      console.log('Web Vital:', metric)
    }
  })

  useEffect(() => {
    // Monitorear performance adicional
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Monitorear navegación
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming
          console.log('Navigation timing:', {
            domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
            loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
            ttfb: navEntry.responseStart - navEntry.requestStart,
          })
        }

        // Monitorear recursos
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming
          if (resourceEntry.duration > 1000) { // Recursos que tardan más de 1s
            console.warn('Slow resource:', resourceEntry.name, resourceEntry.duration)
          }
        }
      }
    })

    observer.observe({ entryTypes: ['navigation', 'resource'] })

    return () => observer.disconnect()
  }, [])

  return null
}

// Hook para monitorear el rendimiento de componentes específicos
export const usePerformanceMonitor = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      if (renderTime > 16.67) { // Más de un frame (60fps)
        console.warn(`${componentName} render time:`, renderTime.toFixed(2), 'ms')
      }
    }
  })
}

// Componente para mostrar métricas en desarrollo
export const PerformanceDebugger = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const showPerformanceInfo = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      console.group('🔥 Performance Metrics')
      console.log('TTFB:', navigation.responseStart - navigation.requestStart, 'ms')
      console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart, 'ms')
      console.log('Load Complete:', navigation.loadEventEnd - navigation.loadEventStart, 'ms')
      console.log('Total Page Load:', navigation.loadEventEnd - navigation.fetchStart, 'ms')
        // Memory usage (si está disponible)
      if ('memory' in performance) {
        const perfWithMemory = performance as PerformanceWithMemory
        const memory = perfWithMemory.memory
        if (memory) {
          console.log('Memory Usage:', {
            used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
            total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
            limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
          })
        }
      }
      console.groupEnd()
    }    // Mostrar métricas después de que la página cargue
    if (document.readyState === 'complete') {
      showPerformanceInfo()
    } else {
      window.addEventListener('load', showPerformanceInfo)
      
      // Cleanup function
      return () => {
        window.removeEventListener('load', showPerformanceInfo)
      }
    }
  }, [])

  return null
}
