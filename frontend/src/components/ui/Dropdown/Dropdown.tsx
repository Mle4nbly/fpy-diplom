
import { useEffect, useRef, type ReactNode } from "react"
import { createPortal } from "react-dom"


export type DropdownItemType = {
  id: string,
  label: string,
  action: (...args: any) => void
}

export interface DropdownProps {
  children: ReactNode,
  btnRef: React.RefObject<HTMLButtonElement | null>,
  onClose: () => void;
}

export const Dropdown = ({children, btnRef, onClose}: DropdownProps) => {
  const dropdownRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    }

  }, [onClose])

  const rect = btnRef?.current?.getBoundingClientRect();

  return createPortal(
    <>
      <div 
        className="dropdown-overlay position-fixed top-0 start-0 w-100 h-100" 
        onClick={onClose}
        style={{zIndex: 1999}}
      >
      </div>
      <ul 
        className="dropdown-menu dropdown-menu-dark"
        ref={dropdownRef}
        style={{
          top: `${(rect?.bottom ?? 0) + 5}px`,
          left: rect?.left
        }}
      >
        {children}
      </ul>
    </>,
    document.body
  )
} 