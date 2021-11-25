/**
 * @cs/component-checkbox
 *
 * Checkbox Component
 *
 */

import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  forwardRef,
  useCallback,
  MutableRefObject
} from 'react';
import { useCombinedRefs } from '@cs/component-hooks';
import { PolymorphicComponentProps } from '@cs/component-utils';

const useCheckbox = (inputRef: MutableRefObject<HTMLInputElement>, args) => {
  const { setChecked, checked = false, indeterminate = false, ...rest } = args;

  const [focused, setFocused] = useState(false);
  const [checkboxProps, setCheckboxProps] = useState({ ...rest });

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.indeterminate = indeterminate;

    setCheckboxProps((prev) => {
      const updated = { ...prev };

      if (indeterminate) {
        updated['aria-checked'] = 'mixed';
        return updated;
      }

      updated['aria-checked'] = checked;
      return updated;
    });
  }, [checked, indeterminate]);

  const onChangeHandler = useCallback(
    () => setChecked(!checked),
    [checked, setChecked]
  );

  const onKeyUpHandler = useCallback((event) => {
    if (event.key === ' ' || event.key === 'Tab') setFocused(true);
  }, []);

  const onBlurHandler = useCallback(() => {
    setFocused(false);
  }, []);

  return {
    ...checkboxProps,
    focused,
    onBlur: onBlurHandler,
    onKeyUp: onKeyUpHandler,
    onChange: onChangeHandler
  };
};

/**
 * checkbox component
 */
export const Checkbox = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, ICheckBoxProps>,
    forwardedRef
  ) => {
    const {
      as,
      children,
      indeterminate,
      checked: controlledChecked,
      ...rest
    } = props;

    const Component = as || 'span';

    const internalRef = useRef<HTMLInputElement>(null);

    const [checked, setChecked] = useState(controlledChecked);

    const inputRef = useCombinedRefs<HTMLInputElement>(
      forwardedRef,
      internalRef
    );

    const { focused, ...checkboxArgs } = useCheckbox(inputRef, {
      checked,
      setChecked,
      indeterminate,
      ...rest
    });

    const status = useMemo(
      () => (indeterminate ? 'mixed' : checked),
      [indeterminate, checked]
    );

    return (
      <Component
        data-cs-checkbox
        data-cs-checkbox-status={status}
        data-cs-checkbox-keyboard-focus={focused}
        {...rest}
      >
        <input
          ref={inputRef}
          type="checkbox"
          checked={checked}
          data-cs-checkbox-input
          {...checkboxArgs}
        />
      </Component>
    );
  }
);

export default Checkbox;

/** Types and Interfaces */

interface ICheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
  children: React.ReactNode;
}

/** Display Names */

Checkbox.displayName = 'Checkbox';
