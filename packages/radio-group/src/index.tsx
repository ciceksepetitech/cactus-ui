/**
 * @ciceksepeti/cui-radio-group
 *
 * RadioGroup Component
 *
 * Radio buttons allow the user to select one option from a set. Once a radio
 * group is established, selecting any radio button in that group automatically
 * deselects any currently-selected radio button in the same group.
 *
 * @see https://www.w3.org/TR/wai-aria-practices-1.2/#radiobutton
 *
 */

import React, {
  useRef,
  useMemo,
  useState,
  useContext,
  forwardRef,
  useCallback,
  createContext
} from 'react';
import {
  useLatestValue,
  useCombinedRefs,
  useOnClickOutside,
  useIsomorphicLayoutEffect
} from '@ciceksepeti/cui-hooks';
import {
  isFunction,
  mergeEventHandlers,
  PolymorphicComponentProps
} from '@ciceksepeti/cui-utils';

let _radioGroupProviderId = 0;
const generateRadioGroupProviderId = () => ++_radioGroupProviderId;

const initialValue = {} as IRadioGroupContext;
const RadioGroupContext = createContext(initialValue);

export const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext);

  if (context === undefined)
    throw new Error(
      'useRadioGroupContext must be used within a RadioGroupProvider'
    );

  return context;
};

const RadioGroupProvider = (props) => {
  const { children, initialValues } = props;
  const {
    value,
    onChange,
    defaultValue,
    isControlled,
    selectedRadioValue,
    setFocusedRadioValue,
    setSelectedRadioValue
  } = initialValues;

  const isMounted = useRef(null);
  const [radios, setRadios] = useState<IRadio[]>([]);
  const [currentValue, setCurrentValue] = useState<string>(
    value || defaultValue
  );
  const onChangeRef =
    useLatestValue<(value: string, id: string, name: string) => void>(onChange);

  const providerId = useMemo(() => generateRadioGroupProviderId(), []);

  useIsomorphicLayoutEffect(() => {
    if (radios.length > 0 && !selectedRadioValue) {
      const [firstSelectableRadio] = radios.filter(({ disabled }) => !disabled);

      if (firstSelectableRadio) {
        const { ref } = firstSelectableRadio;
        ref.current.tabIndex = 0;
      }
    }
  }, [radios, selectedRadioValue]);

  useIsomorphicLayoutEffect(() => {
    if (radios.length > 0 && !isMounted.current && selectedRadioValue) {
      const radio = radios.find((radio) => radio.value === selectedRadioValue);

      if (radio) {
        radio.ref.current.checked = true;
        isMounted.current = true;
      }
    }
  }, [radios, selectedRadioValue]);

  const selectRadio = useCallback(
    (radio: IRadio) => {
      const { id, name, value, ref } = radio;

      ref.current.focus();
      setCurrentValue(value);
      ref.current.tabIndex = 0;

      if (isControlled) {
        onChangeRef.current?.(value, id, name);
      } else {
        ref.current.checked = true;
        setSelectedRadioValue(value);
      }
    },
    [isControlled]
  );

  const setArrowSelection = useCallback(
    (radio: IRadio) => {
      const { value } = radio;

      selectRadio(radio);
      setFocusedRadioValue(value);
    },
    [selectRadio]
  );

  const onClickHandler = useCallback(
    (radio: IRadio) => {
      selectRadio(radio);
      setFocusedRadioValue('');
    },
    [selectRadio]
  );

  const onFocusHandler = useCallback((radio: IRadio) => {
    const { value, ref } = radio;
    ref.current?.focus();
    setFocusedRadioValue(value);
  }, []);

  const onBlurHandler = useCallback((radio: IRadio) => {
    const { ref } = radio;
    ref.current.tabIndex = 0;
  }, []);

  const handleArrowSelection = useCallback(
    (currentValue: string, direction: boolean, radios: IRadio[]) => {
      const selectableRadios = radios.filter(({ disabled }) => !disabled);

      let selectedRadioIndex = selectableRadios.findIndex(
        ({ value }) => value === currentValue
      );

      if (!selectedRadioValue) {
        const nextIndex = selectedRadioIndex + 1;
        selectedRadioIndex =
          nextIndex <= selectableRadios.length ? nextIndex : selectedRadioIndex;
      }

      const nextCursor = direction
        ? (selectedRadioIndex + 1) % selectableRadios.length
        : (selectedRadioIndex - 1 + selectableRadios.length) %
          selectableRadios.length;

      const radio = selectableRadios[nextCursor];
      setArrowSelection(radio);
    },
    [selectedRadioValue, setArrowSelection]
  );

  const onKeyDownHandler = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case ' ':
        case 'Enter':
        case 'Spacebar': {
          const activeElement = document.activeElement as HTMLInputElement;
          const activeElementValue = activeElement.value;

          const radio = radios.find(
            (radio) => radio.value === activeElementValue
          );

          if (radio && !radio.disabled) {
            event.preventDefault();

            radio.ref.current.tabIndex = 0;

            setCurrentValue(activeElementValue);
            setFocusedRadioValue(activeElementValue);

            if (isControlled) {
              onChangeRef.current?.(activeElementValue, radio.id, radio.name);
            } else {
              setSelectedRadioValue(activeElementValue);
            }
          }

          return;
        }

        case 'ArrowUp':
        case 'ArrowLeft': {
          event.preventDefault();
          handleArrowSelection(currentValue, false, radios);
          return;
        }

        case 'ArrowDown':
        case 'ArrowRight': {
          event.preventDefault();
          handleArrowSelection(currentValue, true, radios);
          return;
        }

        default:
          return;
      }
    },
    [currentValue, isControlled, handleArrowSelection, radios]
  );

  const providerValue: IRadioGroupContext = {
    value,
    radios,
    setRadios,
    providerId,
    defaultValue,
    onBlurHandler,
    onFocusHandler,
    onClickHandler,
    onKeyDownHandler,
    ...initialValues
  };

  return (
    <RadioGroupContext.Provider value={providerValue}>
      {children({ providerId, onKeyDownHandler })}
    </RadioGroupContext.Provider>
  );
};

/**
 * radio-group component
 */
export const RadioGroup = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IRadioGroupProps>,
    forwardedRef
  ) => {
    const {
      as,
      name,
      onBlur,
      children,
      onChange,
      onKeyDown,
      value = '',
      defaultValue = '',
      orientation = RadioGroupOrientation.Horizontal,
      ...rest
    } = props;

    showRadioGroupWarnings(RadioGroup.displayName, props);

    const Component = as || 'div';

    const isControlled = !!value;

    const [focusedRadioValue, setFocusedRadioValue] = useState<string>();
    const [selectedRadioValue, setSelectedRadioValue] = useState<string>(
      value || defaultValue
    );

    const internalRef = useRef(null);
    const ref = useCombinedRefs(forwardedRef, internalRef);

    const onOutsideClick = useCallback(() => {
      setFocusedRadioValue('');
    }, []);

    const onBlurHandler = useCallback(() => {
      setFocusedRadioValue('');
    }, []);

    useOnClickOutside(ref, onOutsideClick);

    const initialValues: IRadioGroupProviderProps = {
      name,
      value,
      onChange,
      orientation,
      defaultValue,
      isControlled,
      focusedRadioValue,
      setFocusedRadioValue,
      setSelectedRadioValue,
      selectedRadioValue: isControlled ? value : selectedRadioValue
    };

    return (
      <RadioGroupProvider initialValues={initialValues}>
        {({ providerId, onKeyDownHandler }) => (
          <Component
            id={`radio-group-${providerId}`}
            {...rest}
            ref={ref}
            role="radiogroup"
            data-cui-radio-group
            aria-orientation={orientation}
            onBlur={mergeEventHandlers(onBlur, onBlurHandler)}
            onKeyDown={mergeEventHandlers(onKeyDown, onKeyDownHandler)}
          >
            {isFunction(children)
              ? children({ selectedRadioValue, focusedRadioValue })
              : children}
          </Component>
        )}
      </RadioGroupProvider>
    );
  }
);

export default RadioGroup;

/**
 * radio component
 */
export const Radio = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<
      C,
      React.InputHTMLAttributes<HTMLInputElement>
    >,
    forwardedRef
  ) => {
    const { as, id, value, disabled, ...rest } = props;

    showRadioWarnings(Radio.displayName, props);

    const Component = as || 'span';

    const [radio, setRadio] = useState<IRadio>({} as IRadio);

    const internalRef = useRef<HTMLInputElement>(null);
    const ref = useCombinedRefs<HTMLInputElement>(forwardedRef, internalRef);

    const {
      name,
      setRadios,
      providerId,
      onBlurHandler,
      onFocusHandler,
      onClickHandler,
      focusedRadioValue,
      selectedRadioValue
    } = useRadioGroupContext();

    useIsomorphicLayoutEffect(() => {
      const radioName = name || `radio-${providerId}`;
      const _id = id || `radio-${value}-${providerId}`;

      const radio = {
        ref,
        value,
        id: _id,
        disabled,
        name: radioName
      } as IRadio;

      setRadio(radio);
      setRadios((previousRadios) => [...previousRadios, radio]);

      return () =>
        setRadios((previousRadios) =>
          previousRadios.filter(({ id }) => id !== radio.id)
        );
    }, [id, name, disabled, value, providerId]);

    const isRadioFocused = focusedRadioValue === radio.value;
    const isRadioSelected = selectedRadioValue === radio.value;

    return (
      <Component
        {...rest}
        data-cui-radio
        data-cui-radio-disabled={disabled}
        data-cui-radio-selected={isRadioSelected}
        data-cui-radio-keyboard-focus={isRadioFocused}
      >
        <input
          ref={ref}
          type="radio"
          id={radio.id}
          name={radio.name}
          value={radio.value}
          disabled={disabled}
          data-cui-radio-input
          aria-disabled={disabled}
          aria-checked={isRadioSelected}
          onBlur={() => onBlurHandler(radio)}
          onClick={() => onClickHandler(radio)}
          onFocus={() => onFocusHandler(radio)}
        />
      </Component>
    );
  }
);

/** Warnings */

/**
 * handles development environment warning messages
 * @param componentName
 * @param props
 * @returns
 */
const showRadioGroupWarnings = (
  componentName: string,
  props: IRadioGroupProps
) => {
  if (process.env.NODE_ENV === 'production') return;

  if (props.value && props.defaultValue) {
    const warning = `@ciceksepeti/cui-radio-group - ${componentName}: the value prop is provided with defaultValue. To make radio-group controlled remove defaultValue and add onChange prop or remove value props and leave only defaultValue prop.`;
    console.warn(warning);
  }

  if (props.value === undefined && props.onChange) {
    const warning = `@ciceksepeti/cui-radio-group - ${componentName}: the onChange prop is provided without providing value prop. To make radio-group controlled, add value prop. To use radio-group as uncontrolled component with initial value, use defaultValue prop and remove onChange prop.`;
    console.warn(warning);
  }

  if (props.value !== undefined && !props.onChange) {
    const warning = `@ciceksepeti/cui-radio-group - ${componentName}: the value prop is provided without providing onChange prop. To make radio-group work, add onChange props, remove value prop and use it as uncontrolled component or only add defaultValue prop.`;
    console.warn(warning);
  }

  if (props.defaultValue && props.value) {
    const warning = `@ciceksepeti/cui-radio-group - ${componentName}: a component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. Both defaultValue and value cannot be provided at the same time.`;
    console.warn(warning);
  }

  if (props['aria-labelledby'] && props['aria-label']) {
    const warning = `@ciceksepeti/cui-radio-group - ${componentName}: both aria-labelledby and aria-label provided to component. If label is visible, its id should be passed to aria-labelledby, if it is not description should be passed to aria-label.`;
    console.warn(warning);
  }

  if (props['aria-labelledby'] || props['aria-label']) return;

  const warning = `@ciceksepeti/cui-radio-group - ${componentName}: aria-labelledby or aria-label attribute should be provided to describe content of radio-group.`;
  console.warn(warning);
};

/**
 * handles development environment warning messages
 * @param componentName
 * @param props
 * @returns
 */
const showRadioWarnings = (
  componentName: string,
  props: React.InputHTMLAttributes<HTMLInputElement>
) => {
  if (process.env.NODE_ENV === 'production') return;

  if (props['aria-labelledby'] && props['aria-label']) {
    const warning = `@ciceksepeti/cui-radio - ${componentName}: both aria-labelledby and aria-label provided to component. If label is visible, its id should be passed to aria-labelledby, if it is not description should be passed to aria-label.`;
    console.warn(warning);
  }

  if (props['aria-labelledby'] || props['aria-label']) return;

  const warning = `@ciceksepeti/cui-radio - ${componentName}: aria-labelledby or aria-label attribute should be provided to describe content of radio.`;
  console.warn(warning);
};

/** Types, Enums and Interfaces */

export interface IRadioGroupChildrenProps {
  focusedRadioValue: string;
  selectedRadioValue: string;
}

export interface IRadioGroupProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  orientation?: RadioGroupOrientation;
  onChange?: (value: string, id?: string, name?: string) => void;
  children:
    | ((props: IRadioGroupChildrenProps) => React.ReactNode)
    | React.ReactNode;
}

export interface IRadio {
  id: string;
  name: string;
  value: string;
  disabled?: boolean;
  ref: React.MutableRefObject<HTMLInputElement>;
}

export interface IRadioGroupProviderProps {
  name?: string;
  value?: string;
  isControlled: boolean;
  defaultValue?: string;
  focusedRadioValue: string;
  selectedRadioValue: string;
  orientation?: RadioGroupOrientation;
  onBlurHandler?: (radio: IRadio) => void;
  onFocusHandler?: (radio: IRadio) => void;
  onClickHandler?: (Radio: IRadio) => void;
  onChange?: (value: string, id: string, name: string) => void;
  setFocusedRadioValue: React.Dispatch<React.SetStateAction<string>>;
  setSelectedRadioValue: React.Dispatch<React.SetStateAction<string>>;
}

export interface IRadioGroupContext extends IRadioGroupProviderProps {
  radios: IRadio[];
  providerId: number;
  onKeyDownHandler: (event: KeyboardEvent) => void;
  setRadios: React.Dispatch<React.SetStateAction<IRadio[]>>;
}

export enum RadioGroupOrientation {
  Vertical = 'vertical',
  Horizontal = 'horizontal'
}

/** Display Names */

Radio.displayName = 'Radio';
RadioGroup.displayName = 'RadioGroup';
