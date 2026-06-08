import { useState } from 'react'

export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initial
    } catch {
      return initial
    }
  })

  function set(next) {
    setValue(prev => {
      const resolved = typeof next === 'function' ? next(prev) : next
      try { localStorage.setItem(key, JSON.stringify(resolved)) } catch { /* quota */ }
      return resolved
    })
  }

  return [value, set]
}
