/**
 * @cs/component-checkbox
 *
 * Checkbox Component
 *
 */

import React, { forwardRef, useState, useRef, useEffect } from 'react';
import VisuallyHidden from '@cs/component-visually-hidden';

/**
 * checkbox component
 */
export const Checkbox = forwardRef<HTMLInputElement, ICheckBoxProps>(
  (props, forwardedRef) => {
    const { children, indeterminate, icon, style, checked, ...rest } = props;

    const [isChecked, setIsChecked] = useState(checked);

    const isCustomized = Boolean(style);
    const isControlled = Boolean(checked);
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (!ref.current) return;
      ref.current.indeterminate = indeterminate;
    }, [indeterminate]);

    const status = indeterminate ? 'mixed' : isChecked || ref.current?.checked;

    return (
      <label data-cs-checkbox-label>
        <VisuallyHidden
          ref={ref}
          as="input"
          type="checkbox"
          data-cs-checkbox
          checked={isChecked}
          aria-checked={status}
          disabled={!isCustomized}
          data-cs-checkbox-status={status}
          {...rest}
        />
        {isCustomized && <span data-cs-checkbox-icon>{icon}</span>}
        {children}
      </label>
    );
  }
);

export default Checkbox;

/** Types and Interfaces */

interface ICheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
  children: React.ReactNode;
  icon?: HTMLImageElement | SVGElement;
}

/** Display Names */

Checkbox.displayName = 'Checkbox';
