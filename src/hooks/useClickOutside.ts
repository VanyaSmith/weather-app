import { RefObject, useEffect } from 'react'

export function useOnClickOutside<T extends Function>(
  ref: RefObject<HTMLElement | undefined>,
  handler: T
) {
  useEffect(() => {
    const listener = (event: Event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (event.target instanceof HTMLElement) {
        if (!ref.current || ref.current.contains(event.target)) {
          return
        }
        handler(event)
      }
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
