import { createPopper } from '@popperjs/core';
import type React from 'react';
import { useEffect } from 'react';

export const usePopperDropdown = (
  buttonRef: React.RefObject<HTMLButtonElement | null>,
  dropdownRef: React.RefObject<HTMLElement | null>,
) => {
  useEffect(() => {
    if (buttonRef.current && dropdownRef.current) {
      const popperInstance = createPopper(buttonRef.current, dropdownRef.current, {
        placement: 'bottom-start',
        modifiers: [
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
};
