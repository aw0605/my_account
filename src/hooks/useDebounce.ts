import { useEffect, useState } from 'react'

function useDebounce<T = any>(value: T, delay = 700) {
  const [debouncedVal, setDebouncedVal] = useState<T>(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedVal(value)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [value, delay])

  return debouncedVal
}

export default useDebounce
