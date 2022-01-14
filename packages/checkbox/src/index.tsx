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
import {
  mergeEventHandlers,
  PolymorphicComponentProps
} from '@cs/component-utils';
import { useCombinedRefs } from '@cs/component-hooks';

const useCheckbox = (inputRef: MutableRefObject<HTMLInputElement>, args) => {
  const {
    defaultChecked,
    disabled = false,
    indeterminate = false,
    checked: controlledCheck,
    ...rest
  } = args;

  const isMounted = useRef(false);
  const [focused, setFocused] = useState(false);
  const [checked, setChecked] = useState(controlledCheck);
  const [checkboxProps, setCheckboxProps] = useState({ ...rest });

  const isControlled = useMemo(
    () => controlledCheck !== undefined,
    [controlledCheck]
  );

  useEffect(() => {
    inputRef.current.indeterminate = indeterminate;

    setCheckboxProps((prev) => {
      const updated = { ...prev };
      let ariaChecked = null;

      if (indeterminate) ariaChecked = 'mixed';
      else if (isControlled) ariaChecked = checked;
      else ariaChecked = inputRef.current.checked;

      updated['aria-checked'] = ariaChecked;
      return updated;
    });
  }, [checked, isControlled, indeterminate]);

  useEffect(() => {
    setChecked(controlledCheck);
  }, [controlledCheck]);

  const onChangeHandler = useCallback(() => {
    if (isControlled) return;

    const state = !inputRef.current.checked;
    inputRef.current.checked = state;
    setChecked(state);
  }, [isControlled]);

  const onClickHandler = useCallback(() => {
    inputRef.current.focus();

    if (disabled) return;

    if (isControlled) {
      inputRef.current.checked = !checked;
      setChecked(!checked);
    } else {
      const state = !inputRef.current.checked;

      inputRef.current.checked = state;
      setChecked(state);
    }
  }, [checked, isControlled, disabled]);

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

  const status = useMemo(() => {
    if (!isMounted.current && defaultChecked) {
      isMounted.current = true;
      return defaultChecked;
    }

    isMounted.current = true;

    if (indeterminate) return 'mixed';

    if (isControlled) return checked;
    else return inputRef.current?.checked;
  }, [indeterminate, defaultChecked, isControlled, checked]);

  return {
    ...checkboxProps,
    status,
    focused,
    disabled,
    defaultChecked,
    onBlur: onBlurHandler,
    onKeyUp: onKeyUpHandler,
    onClick: onClickHandler,
    onChange: onChangeHandler,
    checked: !isControlled ? undefined : checked
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
      onBlur,
      onKeyUp,
      disabled,
      onChange,
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

    const {
      status,
      focused,
      onClick,
      onBlur: onBlurHandler,
      onKeyUp: onKeyUpHandler,
      onChange: onChangeHandler,
      ...checkboxArgs
    } = useCheckbox(inputRef, {
      disabled,
      indeterminate,
      defaultChecked,
      checked: controlledCheck
    });

    return (
      <Component
        data-cs-checkbox
        onClick={onClick}
        data-cs-checkbox-status={status}
        data-cs-checkbox-disabled={disabled}
        data-cs-checkbox-keyboard-focus={focused}
      >
        <input
          {...rest}
          {...checkboxArgs}
          ref={inputRef}
          type="checkbox"
          data-cs-checkbox-input
          onBlur={mergeEventHandlers(onBlur, onBlurHandler)}
          onKeyUp={mergeEventHandlers(onKeyUp, onKeyUpHandler)}
          onChange={mergeEventHandlers(onChange, onChangeHandler)}
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
