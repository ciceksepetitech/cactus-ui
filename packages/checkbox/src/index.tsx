/**
 * @cs/component-checkbox
 *
 * Checkbox Component
 *
 */

import React, {
  useRef,
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

  return {
    ...checkboxProps,
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

    const [focused, setFocused] = useState(false);
    const [checked, setChecked] = useState(controlledChecked);

    const inputRef = useCombinedRefs<HTMLInputElement>(
      forwardedRef,
      internalRef
    );

    const { icon: checkboxIcon, ...checkboxArgs } = useCheckbox(inputRef, {
      checked,
      setChecked,
      indeterminate,
      ...rest
    });

    const onKeyUpHandler = useCallback((event) => {
      if (event.key === ' ' || event.key === 'Tab') setFocused(true);
    }, []);

    const onBlurHandler = useCallback(() => {
      setFocused(false);
    }, []);

    return (
      <Component
        data-cs-checkbox
        data-cs-checkbox-keyboard-focus={focused}
        data-cs-checkbox-status={indeterminate ? 'mixed' : checked}
        {...rest}
      >
        <input
          ref={inputRef}
          type="checkbox"
          checked={checked}
          data-cs-checkbox-input
          onBlur={onBlurHandler}
          onKeyUp={onKeyUpHandler}
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
