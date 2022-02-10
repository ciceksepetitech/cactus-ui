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
    setFocusedRadioValue,
    setSelectedRadioValue
  } = initialValues;

  const [currentValue, setCurrentValue] = useState<string>();
  const [radios, setRadios] = useState<IRadio[]>([]);
  const onChangeRef =
    useLatestValue<(value: string, id: string, name: string) => void>(onChange);

  const providerId = useMemo(() => generateRadioGroupProviderId(), []);

  const setArrowSelection = useCallback((radio: IRadio) => {
    const { id, name, value, ref } = radio;

    setCurrentValue(value);
    setFocusedRadioValue(value);
    setSelectedRadioValue(value);

    ref.current?.focus();
    ref.current.value = value;
    onChangeRef.current?.(value, id, name);
  }, []);

  const onClickHandler = useCallback((radio: IRadio) => {
    const { id, name, value, ref } = radio;

    setCurrentValue(value);
    setFocusedRadioValue('');
    setSelectedRadioValue(value);

    ref.current?.focus();
    ref.current.value = value;
    onChangeRef.current?.(value, id, name);
  }, []);

  const handleArrowSelection = useCallback(
    (currentValue: string, direction: boolean, radios: IRadio[]) => {
      const selectableRadios = radios.filter(({ disabled }) => !disabled);
      const selectedRadioValue = selectableRadios.findIndex(
        ({ value }) => value === currentValue
      );

      const nextCursor = direction
        ? (selectedRadioValue + 1) % selectableRadios.length
        : (selectedRadioValue - 1 + selectableRadios.length) %
          selectableRadios.length;

      const radio = selectableRadios[nextCursor];
      setArrowSelection(radio);
    },
    [setArrowSelection]
  );

  const onKeyDownHandler = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case ' ':
        case 'Enter':
        case 'Spacebar': {
          const radio = radios.find((radio) => radio.value === currentValue);

          if (radio && !radio.disabled) {
            setSelectedRadioValue(currentValue);
            onChangeRef.current?.(currentValue, radio.id, radio.name);
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
    [currentValue, handleArrowSelection, radios]
  );

  const providerValue: IRadioGroupContext = {
    value,
    radios,
    setRadios,
    providerId,
    defaultValue,
    onClickHandler,
    onKeyDownHandler,
    ...initialValues
  };

  return (
    <RadioGroupContext.Provider value={providerValue}>
      {children({ onKeyDownHandler })}
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
      children,
      onKeyDown,
      value = '',
      defaultValue = '',
      orientation = RadioGroupOrientation.Horizontal,
      ...rest
    } = props;

    const Component = as || 'div';

    const [focusedRadioValue, setFocusedRadioValue] = useState<string>();
    const [selectedRadioValue, setSelectedRadioValue] = useState<string>();

    const internalRef = useRef(null);
    const ref = useCombinedRefs(forwardedRef, internalRef);

    const onOutsideClick = useCallback(() => {
      setFocusedRadioValue('');
    }, []);

    useOnClickOutside(ref, onOutsideClick);

    const initialValues: IRadioGroupProviderProps = {
      value,
      orientation,
      defaultValue,
      focusedRadioValue,
      selectedRadioValue,
      setFocusedRadioValue,
      setSelectedRadioValue
    };

    return (
      <RadioGroupProvider initialValues={initialValues}>
        {({ onKeyDownHandler }) => (
          <Component
            {...rest}
            ref={ref}
            role="radiogroup"
            data-cui-radio-group
            aria-orientation={orientation}
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
    const { as, disabled, value, children, onClick, ...rest } = props;

    const Component = as || 'span';

    const [radio, setRadio] = useState<IRadio>({} as IRadio);

    const internalRef = useRef<HTMLInputElement>(null);
    const ref = useCombinedRefs<HTMLInputElement>(forwardedRef, internalRef);

    const {
      setRadios,
      providerId,
      onClickHandler,
      focusedRadioValue,
      selectedRadioValue
    } = useRadioGroupContext();

    useIsomorphicLayoutEffect(() => {
      const name = `radio-${providerId}`;
      const id = `radio-${value}-${providerId}`;

      const radio = {
        id,
        ref,
        name,
        value,
        disabled
      } as IRadio;

      setRadio(radio);
      setRadios((previousRadios) => [...previousRadios, radio]);

      return () =>
        setRadios((previousRadios) =>
          previousRadios.filter(({ id }) => id !== radio.id)
        );
    }, [disabled, value, providerId]);

    const isRadioFocused = focusedRadioValue === radio.value;
    const isRadioSelected = selectedRadioValue === radio.value;

    return (
      <Component
        data-cui-radio
        data-cui-radio-disabled={disabled}
        data-cui-radio-selected={isRadioSelected}
        data-cui-radio-keyboard-focus={isRadioFocused}
      >
        <input
          id={radio.id}
          name={radio.name}
          {...rest}
          ref={ref}
          type="radio"
          value={value}
          disabled={disabled}
          data-cui-radio-input
          aria-disabled={disabled}
          tabIndex={isRadioSelected ? 0 : -1}
          onClick={mergeEventHandlers(onClick, () => onClickHandler(radio))}
        />
      </Component>
    );
  }
);

/** Types, Enums and Interfaces */

export interface IRadioGroupChildrenProps {
  focusedRadioValue: string;
  selectedRadioValue: string;
}

export interface IRadioGroupProps {
  value?: string;
  defaultValue?: string;
  orientation?: RadioGroupOrientation;
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
  value: string;
  defaultValue: string;
  focusedRadioValue: string;
  selectedRadioValue: string;
  orientation?: RadioGroupOrientation;
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
