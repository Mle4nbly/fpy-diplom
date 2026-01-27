import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { createPopper } from '@popperjs/core';

export type DropdownItemType<TArgs extends unknown[] = []> = {
  id: string;
  label: string;
  action: (...args: TArgs) => void;
};

export interface DropdownProps {
  children: ReactNode;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}

export const Dropdown = ({ children, buttonRef, onClose }: DropdownProps) => {
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current?.contains(target)) {
        return;
      }
      onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  useEffect(() => {
    if (buttonRef.current && dropdownRef.current) {
      const popperInstance = createPopper(buttonRef.current, dropdownRef.current, {
        placement: 'bottom-start',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 4],
            },
          },
          {
            name: 'flip',
            enabled: true,
            options: {
              padding: 5,
            },
          },
          {
            name: 'preventOverflow',
            options: {
              boundary: 'viewport',
            },
          },
        ],
      });

      return () => popperInstance.destroy();
    }
  }, [buttonRef, dropdownRef]);

  return createPortal(
    <ul className="dropdown-menu" ref={dropdownRef}>
      {children}
    </ul>,
    document.body,
  );
};
