/**
 * @ciceksepeti/cui-listbox
 *
 * Listbox Component
 * @see https://www.w3.org/TR/wai-aria-practices/#Listbox
 *
 */

import React, {
  useRef,
  useMemo,
  useState,
  Children,
  useEffect,
  forwardRef,
  useContext,
  useCallback,
  createContext
} from 'react';
import {
  usePrevious,
  useLatestValue,
  useCombinedRefs,
  useEventListener,
  useOnClickOutside
} from '@ciceksepeti/cui-hooks';
import {
  mergeEventHandlers,
  PolymorphicComponentProps
} from '@ciceksepeti/cui-utils';
import Popover, { IPopoverProps } from '@ciceksepeti/cui-popover';

const initialValue = {} as IListboxContext;
const ListboxContext = createContext(initialValue);

let _providerId = 0;
const generateProviderId = () => ++_providerId;

export const useListboxContext = () => {
  const context = useContext(ListboxContext);

  if (context === undefined)
    throw new Error('useListboxContext must be used within a ListboxProvider');

  return context;
};

const getLabel = (children: React.ReactNode) => {
  let label = '';

  const childrenArray = Children.toArray(children);

  Children.map(childrenArray, (child: React.ReactElement) => {
    if (typeof child === 'string') label += child;
    if (typeof child === 'object') label += getLabel(child.props.children);
  });

  return label;
};

const useListbox = (props) => {
  const {
    cursor,
    options,
    onChange,
    setCursor,
    isControlled,
    setIsExpanded,
    setSelectedItem
  } = props;

  const getIndexOfOption = useCallback(
    (cursor) => {
      const index = options.findIndex(
        (option) => option.value === cursor.value
      );

      return index;
    },
    [options]
  );

  const onTargetKeyDown = useCallback((event) => {
    switch (event.key) {
      case ' ':
      case 'Enter':
      case 'Spacebar': {
        setIsExpanded((prev) => !prev);
        return;
      }

      default:
        break;
    }
  }, []);

  const onKeyDown = useCallback(
    (event) => {
      const index = getIndexOfOption(cursor);
      const item = options[index];

      switch (event.key) {
        case ' ':
        case 'Enter':
        case 'Spacebar': {
          event.preventDefault();
          event.stopPropagation();

          if (item && !item.disabled) {
            setIsExpanded((prev) => !prev);

            if (isControlled) {
              onChange?.(item.value);
              return;
            }

            setSelectedItem(item);
          }

          return;
        }

        case 'ArrowUp': {
          event.preventDefault();
          const cursor = index - 1 >= 0 ? index - 1 : options.length - 1;
          setCursor(options[cursor]);

          return;
        }

        case 'ArrowDown': {
          event.preventDefault();
          const cursor = index + 1 <= options.length - 1 ? index + 1 : 0;
          setCursor(options[cursor]);

          return;
        }

        case 'Escape': {
          setIsExpanded(false);
          return;
        }

        default:
          break;
      }
    },
    [cursor, isControlled, options]
  );

  return {
    onKeyDown,
    onTargetKeyDown
  };
};

const useListboxItem = (props) => {
  const {
    options,
    onChange,
    setCursor,
    isControlled,
    setIsExpanded,
    setSelectedItem
  } = props;

  const onMouseEnter = useCallback((item) => {
    setCursor(item);
  }, []);

  const onTouchStart = useCallback((item) => {
    setCursor(item);
  }, []);

  const onMouseLeave = useCallback(() => {
    setCursor({});
  }, []);

  const onItemClick = useCallback(
    (value) => {
      const item = options.find((option) => option.value === value);
      if (item.disabled) return;

      setIsExpanded(false);

      if (isControlled) {
        onChange?.(item.value);
        return;
      }

      setSelectedItem(item);
    },
    [options, isControlled]
  );

  return {
    onItemClick,
    onMouseEnter,
    onMouseLeave,
    onTouchStart
  };
};

const ListboxProvider = (props) => {
  const { children, initialValues } = props;

  const { value, targetRef, isControlled, defaultValue, onChange, disabled } =
    initialValues as IListboxProviderProps;

  const popoverRef = useRef(null);
  const hiddenInputRef = useRef(null);
  const [options, setOptions] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [cursor, setCursor] = useState<IListboxOption>({} as IListboxOption);
  const [selectedItem, setSelectedItem] = useState<IListboxOption>(
    {} as IListboxOption
  );

  const previousExpanded = usePrevious(isExpanded);

  const providerId = useMemo(() => generateProviderId(), []);

  useEffect(() => {
    if (isControlled && options.length > 0) {
      const item = options.find((option) => option.value === value) || {};
      setCursor(item);
      setSelectedItem(item);

      return;
    }
  }, [options, value, isControlled]);

  useEffect(() => {
    if (isControlled) return;

    if (!selectedItem.value && options.length > 0) {
      if (value || defaultValue) {
        const _value = value || defaultValue;
        const item = options.find((option) => option.value === _value);

        setCursor(item);
        setSelectedItem(item);
      } else {
        const item = options[0];

        setCursor(item);
        setSelectedItem(item);
      }
    }
  }, [value, isControlled, defaultValue, options]);

  useEffect(() => {
    if (previousExpanded && !isExpanded) setCursor(selectedItem);
  }, [previousExpanded, selectedItem, isExpanded]);

  const { onKeyDown, onTargetKeyDown } = useListbox({
    cursor,
    options,
    onChange,
    setCursor,
    isControlled,
    setIsExpanded,
    setSelectedItem
  });

  const { onMouseEnter, onMouseLeave, onTouchStart, onItemClick } =
    useListboxItem({
      options,
      onChange,
      setCursor,
      isControlled,
      setIsExpanded,
      setSelectedItem
    });

  const onTargetMousedown = useCallback(
    (event) => {
      if (popoverRef.current?.contains(event.target)) return;

      event.stopPropagation();
      setIsExpanded(!isExpanded);
    },
    [isExpanded]
  );

  useEventListener({
    name: 'mousedown',
    target: targetRef,
    condition: !disabled,
    listener: onTargetMousedown
  });

  useEventListener({
    name: 'keydown',
    target: targetRef,
    condition: !disabled,
    listener: onTargetKeyDown
  });

  const providerValue: IListboxContext = {
    cursor,
    options,
    disabled,
    onKeyDown,
    setOptions,
    isExpanded,
    popoverRef,
    providerId,
    onItemClick,
    onMouseEnter,
    onTouchStart,
    selectedItem,
    onMouseLeave,
    setIsExpanded,
    hiddenInputRef,
    setSelectedItem,
    ...initialValues
  };

  return (
    <ListboxContext.Provider value={providerValue}>
      {children({ label: selectedItem.label, isExpanded })}
    </ListboxContext.Provider>
  );
};

export const ListboxInput = forwardRef(
  (props: React.ComponentProps<'input'>, forwardedRef) => {
    const internalRef = useRef(null);
    const ref = useCombinedRefs(forwardedRef, internalRef);

    const { selectedItem } = useListboxContext();

    return (
      <input
        readOnly
        ref={ref}
        type="hidden"
        tabIndex={-1}
        data-cui-listbox-input
        value={selectedItem.value || ''}
        {...props}
      />
    );
  }
);

export const ListboxButton = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IListboxProps>,
    forwardedRef
  ) => {
    const {
      as,
      value,
      arrow,
      prefix,
      children,
      onChange,
      disabled,
      defaultValue,
      ...rest
    } = props;

    showContentWarnings(Listbox.displayName, props);
    showListboxWarnings(Listbox.displayName, props);

    const isControlled = value !== undefined;

    const onChangeRef = useLatestValue(onChange);

    const internalRef = useRef(null);
    const ref = useCombinedRefs(forwardedRef, internalRef);

    const Component = as || 'button';

    const initialValues: IListboxProviderProps = {
      value,
      disabled,
      defaultValue,
      isControlled,
      targetRef: ref,
      onChange: onChangeRef.current
    };

    return (
      <ListboxProvider initialValues={initialValues}>
        {({ label, isExpanded }) => (
          <Component
            ref={ref}
            role="button"
            type="button"
            data-cui-listbox-button
            aria-haspopup="listbox"
            aria-disabled={disabled}
            aria-expanded={isExpanded}
            tabIndex={disabled ? -1 : 0}
            {...rest}
          >
            <React.Fragment>
              <span data-cui-listbox-label>
                {prefix}
                {label}
              </span>
              {arrow ? arrow : <ListboxArrow />}
              {children}
            </React.Fragment>
          </Component>
        )}
      </ListboxProvider>
    );
  }
);

export const ListboxList = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IListboxProps>,
    forwardedRef
  ) => {
    const { as, children, ...rest } = props;

    const [refNode, setRefNode] = useState<HTMLElement>();
    const { providerId, isExpanded, cursor, onKeyDown } = useListboxContext();

    const internalRef = useRef(null);
    const ref = useCombinedRefs(forwardedRef, internalRef);

    const Component = as || 'ul';

    useEffect(() => {
      if (isExpanded) refNode.focus();
    }, [isExpanded, refNode]);

    useEventListener({
      target: ref,
      name: 'keydown',
      listener: onKeyDown,
      condition: isExpanded
    });

    const refCallback = useCallback((node: HTMLElement) => {
      ref.current = node;
      setRefNode(node);
    }, []);

    return (
      <Component
        tabIndex={-1}
        role="listbox"
        ref={refCallback}
        data-cui-listbox-list
        id={`listbox-${providerId}`}
        aria-activedescendant={isExpanded ? cursor.id : undefined}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export const ListboxItem = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IListboxItemProps>,
    forwardedRef
  ) => {
    const {
      id,
      as,
      value,
      children,
      disabled,
      onMouseLeave,
      onMouseEnter,
      onTouchStart,
      ...rest
    } = props;

    const [option, setOption] = useState<IListboxOption>({} as IListboxOption);

    const {
      cursor,
      providerId,
      setOptions,
      onItemClick,
      selectedItem,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart
    } = useListboxContext();

    useEffect(() => {
      const label = getLabel(children);
      const _id = id || `option-${value}-listbox-${providerId}`;
      const option = { id: _id, label, disabled, value };

      setOption(option);
      setOptions((previousOptions) => [...previousOptions, option]);

      return () =>
        setOptions((previousOptions) =>
          previousOptions.filter(({ value }) => value !== option.value)
        );
    }, [id, disabled, providerId]);

    const Component = as || 'li';

    return (
      <Component
        role="option"
        id={option.id}
        ref={forwardedRef}
        data-value={value}
        data-cui-listbox-item
        aria-disabled={disabled}
        data-label={option.label}
        onClick={() => onItemClick(value)}
        aria-selected={cursor.value === value}
        data-active={selectedItem.value === value}
        onMouseLeave={mergeEventHandlers(onMouseLeave, handleMouseLeave)}
        onMouseEnter={mergeEventHandlers(onMouseEnter, () =>
          handleMouseEnter(option)
        )}
        onTouchStart={mergeEventHandlers(onTouchStart, () =>
          handleTouchStart(option)
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export const ListboxArrow = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IListboxProps>,
    forwardedRef
  ) => {
    const { as, ...rest } = props;

    const Component = as || 'span';

    const { isExpanded } = useListboxContext();

    return (
      <Component
        aria-hidden
        ref={forwardedRef}
        data-cui-listbox-arrow
        data-expanded={isExpanded}
        {...rest}
      />
    );
  }
);

export const ListboxPopover = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IPopoverProps>,
    forwardedRef
  ) => {
    const { children, ...rest } = props;

    const context = useListboxContext();
    const { targetRef, isExpanded, setIsExpanded, popoverRef } = context;

    const ref = useCombinedRefs(forwardedRef, popoverRef);

    const onOutsideClick = useCallback(() => {
      setIsExpanded(false);
    }, []);

    const setPopoverWidth = useCallback(() => {
      if (popoverRef.current && targetRef.current) {
        popoverRef.current.style.minWidth =
          targetRef.current.clientWidth + 'px';
      }
    }, []);

    useEffect(() => {
      setPopoverWidth();
    }, [setPopoverWidth]);

    useEventListener({
      name: 'resize',
      listener: setPopoverWidth
    });

    useOnClickOutside(ref, onOutsideClick);

    return (
      <Popover
        {...rest}
        ref={ref}
        hidden={!isExpanded}
        targetRef={targetRef}
        data-cui-listbox-popover
      >
        <ListboxList>{children}</ListboxList>
      </Popover>
    );
  }
);

/**
 * listbox component
 */
export const Listbox = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IListboxProps>,
    forwardedRef
  ) => {
    const { children, portal, name, required, ...rest } = props;

    return (
      <ListboxButton {...rest} ref={forwardedRef}>
        <ListboxInput name={name} required={required} />
        <ListboxPopover portal={portal}>{children}</ListboxPopover>
      </ListboxButton>
    );
  }
);

export default Listbox;

/** Warnings */

/**
 * handles development environment warning messages
 * @param componentName
 * @param props
 * @returns
 */
const showListboxWarnings = (componentName: string, props: IListboxProps) => {
  if (process.env.NODE_ENV === 'production') return;

  if (props.value && props.defaultValue) {
    const warning = `@ciceksepeti/cui-listbox - ${componentName}: the value prop is provided with defaultValue. To make listbox controlled remove defaultValue and add onChange prop or remove value props and leave only defaultValue prop.`;
    console.warn(warning);
  }

  if (props.value === undefined && props.onChange) {
    const warning = `@ciceksepeti/cui-listbox - ${componentName}: the onChange prop is provided without providing value prop. To make listbox controlled, add value prop. To use listbox as uncontrolled component with initial value, use defaultValue prop and remove onChange prop.`;
    console.warn(warning);
  }

  if (props.value !== undefined && !props.onChange) {
    const warning = `@ciceksepeti/cui-listbox - ${componentName}: the value prop is provided without providing onChange prop. To make listbox work, add onChange props, remove value prop and use it as uncontrolled component or only add defaultValue prop.`;
    console.warn(warning);
  }
};

/**
 * handles development environment warning messages
 * @param componentName
 * @param props
 * @returns
 */
const showContentWarnings = (componentName: string, props: IListboxProps) => {
  if (process.env.NODE_ENV === 'production') return;

  if (props['aria-labelledby'] && props['aria-label']) {
    const warning = `@ciceksepeti/cui-listbox - ${componentName}: both aria-labelledby and aria-label provided to component. If label is visible, its id should be passed to aria-labelledby, if it is not description should be passed to aria-label.`;
    console.warn(warning);
  }

  if (props['aria-labelledby'] || props['aria-label']) return;

  const warning = `@ciceksepeti/cui-listbox - ${componentName}: aria-labelledby or aria-label attribute should be provided to describe listbox`;

  console.warn(warning);
};

/** Types and Interfaces */

export type ListboxValue = string | number | readonly string[];

export interface IListboxProps
  extends Omit<React.ComponentProps<'select'>, 'prefix' | 'onChange'> {
  name?: string;
  portal?: boolean;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  arrow?: React.ReactNode;
  prefix?: React.ReactNode;
  children: React.ReactNode;
  onChange?: (value: string) => void;
}

export interface IListboxItemProps {
  disabled?: boolean;
  value: ListboxValue;
  children: React.ReactNode;
  onMouseLeave: (event: React.SyntheticEvent) => any;
  onMouseEnter: (event: React.SyntheticEvent) => any;
  onTouchStart: (event: React.SyntheticEvent) => any;
}

export interface IListboxOption {
  id: string;
  label: string;
  disabled: boolean;
  value: ListboxValue;
}

export interface IListboxProviderProps {
  disabled?: boolean;
  value: ListboxValue;
  defaultValue: string;
  isControlled: boolean;
  onChange: (value: string) => void;
  targetRef: React.MutableRefObject<any>;
}

export interface IListboxContext {
  disabled?: boolean;
  providerId: number;
  isExpanded: boolean;
  onKeyDown: () => void;
  cursor: IListboxOption;
  onMouseLeave: () => void;
  options: IListboxOption[];
  selectedItem: IListboxOption;
  targetRef: React.MutableRefObject<any>;
  popoverRef: React.MutableRefObject<any>;
  onItemClick: (value: ListboxValue) => void;
  hiddenInputRef: React.MutableRefObject<any>;
  onMouseEnter: (value: IListboxOption) => void;
  onTouchStart: (value: IListboxOption) => void;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setOptions: React.Dispatch<React.SetStateAction<IListboxOption[]>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<IListboxOption>>;
}

/** Display Names */

Listbox.displayName = 'Listbox';
ListboxItem.displayName = 'ListboxItem';
ListboxList.displayName = 'ListboxList';
ListboxArrow.displayName = 'ListboxArrow';
ListboxButton.displayName = 'ListboxButton';
ListboxPopover.displayName = 'ListboxPopover';
