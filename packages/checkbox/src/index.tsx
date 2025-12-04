/**
 * @ciceksepeti/cui-checkbox
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
} from '@ciceksepeti/cui-utils';
import { useCombinedRefs } from '@ciceksepeti/cui-hooks';

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
      id,
      name,
      value,
      onClick,
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

    const {
      status,
      focused,
      onBlur,
      onKeyUp,
      onChange,
      onClick: onClickHandler,
      ...checkboxArgs
    } = useCheckbox(inputRef, {
      disabled,
      indeterminate,
      defaultChecked,
      checked: controlledCheck
    });

    return (
      <Component
        {...rest}
        data-cui-checkbox
        data-cui-checkbox-status={status}
        data-cui-checkbox-disabled={disabled}
        data-cui-checkbox-keyboard-focus={focused}
        onClick={mergeEventHandlers(onClick, onClickHandler)}
      >
        <input
          {...checkboxArgs}
          id={id}
          name={name}
          value={value}
          ref={inputRef}
          type="checkbox"
          onBlur={onBlur}
          onKeyUp={onKeyUp}
          onChange={onChange}
          data-cui-checkbox-input
        />
      </Component>
    );
  }
);

export default Checkbox;

/** Types and Interfaces */

export interface ICheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
}

/** Display Names */

Checkbox.displayName = 'Checkbox';
