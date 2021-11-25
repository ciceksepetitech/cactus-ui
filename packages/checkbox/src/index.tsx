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
  const {
    disabled = false,
    indeterminate = false,
    defaultChecked = false,
    checked: controlledCheck = false,
    ...rest
  } = args;

  const [focused, setFocused] = useState(false);
  const [checkboxProps, setCheckboxProps] = useState({ ...rest });
  const [checked, setChecked] = useState(defaultChecked || controlledCheck);

  useEffect(() => {
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

  const onClickHandler = useCallback(() => {
    inputRef.current.focus();

    if (!disabled) {
      inputRef.current.checked = !checked;
      setChecked(!checked);
    }
  }, [checked, setChecked, disabled]);

  const onKeyUpHandler = useCallback((event) => {
    /* istanbul ignore next */
    if (event.key === 'Spacebar' || event.key === ' ' || event.key === 'Tab') {
      // @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values#whitespace_keys
      setFocused(true);
    }
  }, []);

  const onBlurHandler = useCallback(() => {
    setFocused(false);
  }, []);

  const status = useMemo(
    () => (indeterminate ? 'mixed' : checked),
    [indeterminate, checked]
  );

  return {
    ...checkboxProps,
    status,
    focused,
    disabled,
    defaultChecked,
    onBlur: onBlurHandler,
    onKeyUp: onKeyUpHandler,
    onClick: onClickHandler,
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
      id,
      name,
      value,
      disabled,
      indeterminate,
      defaultChecked,
      checked: controlledCheck,
      ...rest
    } = props;

    const Component = as || 'span';

    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = useCombinedRefs<HTMLInputElement>(
      forwardedRef,
      internalRef
    );

    const { focused, status, onClick, ...checkboxArgs } = useCheckbox(
      inputRef,
      {
        id,
        name,
        value,
        disabled,
        indeterminate,
        defaultChecked,
        checked: controlledCheck
      }
    );

    return (
      <Component
        data-cs-checkbox
        onClick={onClick}
        data-cs-checkbox-status={status}
        data-cs-checkbox-disabled={disabled}
        data-cs-checkbox-keyboard-focus={focused}
        {...rest}
      >
        <input
          ref={inputRef}
          type="checkbox"
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
}

/** Display Names */

Checkbox.displayName = 'Checkbox';
