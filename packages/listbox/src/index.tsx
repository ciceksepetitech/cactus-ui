/**
 * @cs/component-listbox
 *
 * Listbox Component
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
  useCombinedRefs,
  useEventListener,
  useOnClickOutside
} from '@cs/component-hooks';
import Popover from '@cs/component-popover';
import { PolymorphicComponentProps } from '@cs/component-utils';

const initialValue = {} as any;
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
  const { options, cursor, setSelectedItem, setIsExpanded, setCursor } = props;

  const getIndexOfOption = useCallback(
    (cursor) => {
      const index = options.findIndex((option) => option.value === cursor);
      return index;
    },
    [options]
  );

  const onTargetKeyDown = useCallback((event) => {
    switch (event.key) {
      case ' ':
      case 'Spacebar': {
        setIsExpanded((prev) => !prev);
        return;
      }

      case 'Enter': {
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

          if (item) {
            setSelectedItem(item);
            setIsExpanded((prev) => !prev);
          }

          return;
        }

        case 'ArrowUp': {
          const cursor = index - 1 >= 0 ? index - 1 : options.length - 1;
          setCursor(options[cursor].value);
          return;
        }

        case 'ArrowDown': {
          const cursor = index + 1 <= options.length - 1 ? index + 1 : 0;
          setCursor(options[cursor].value);
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
    [cursor, options]
  );

  return {
    onKeyDown,
    onTargetKeyDown
  };
};

const useListboxItem = (props) => {
  const { options, setSelectedItem, setCursor, setIsExpanded } = props;

  const onMouseEnter = useCallback((item) => {
    setCursor(item);
  }, []);

  const onMouseLeave = useCallback(() => {
    setCursor(null);
  }, []);

  const onItemClick = useCallback(
    (value) => {
      const item = options.find((option) => option.value === value);

      setSelectedItem(item);
      setIsExpanded(false);
    },
    [options]
  );

  return {
    onItemClick,
    onMouseEnter,
    onMouseLeave
  };
};

const ListboxProvider = (props) => {
  const { children, initialValues } = props;

  const { value, targetRef, disabled } = initialValues;

  const popoverRef = useRef(null);
  const hiddenInputRef = useRef(null);

  const [cursor, setCursor] = useState({});
  const [options, setOptions] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>({});

  const previousExpanded = usePrevious(isExpanded);

  const providerId = useMemo(() => generateProviderId(), []);

  useEffect(() => {
    if (!selectedItem.value && options.length > 0) {
      if (value) {
        const item = options.find((option) => option.value === value);

        setSelectedItem(item);
        setCursor(item.value);
      } else {
        setSelectedItem(options[0]);
        setCursor(options[0].value);
      }
    }
  }, [value, options]);

  useEffect(() => {
    if (previousExpanded && !isExpanded) setCursor(selectedItem.value);
  }, [previousExpanded, selectedItem, isExpanded]);

  const { onKeyDown, onTargetKeyDown } = useListbox({
    cursor,
    options,
    setCursor,
    setIsExpanded,
    setSelectedItem
  });

  const { onMouseEnter, onMouseLeave, onItemClick } = useListboxItem({
    options,
    setCursor,
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
    listener: onTargetMousedown
  });

  useEventListener({
    name: 'keydown',
    target: targetRef,
    listener: onTargetKeyDown
  });

  const providerValue = {
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
    selectedItem,
    onMouseLeave,
    setIsExpanded,
    hiddenInputRef,
    setSelectedItem,
    ...initialValues
  };

  return (
    <ListboxContext.Provider value={providerValue}>
      {typeof children === 'function'
        ? children({ label: selectedItem.label, isExpanded })
        : children}
    </ListboxContext.Provider>
  );
};

export const ListboxInput = forwardRef((props: any, forwardedRef) => {
  const internalRef = useRef(null);
  const ref = useCombinedRefs(forwardedRef, internalRef);

  return (
    <input
      readOnly
      ref={ref}
      type="hidden"
      tabIndex={-1}
      data-cs-listbox-input
      {...props}
    />
  );
});

export const ListboxButton = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IListboxProps>,
    forwardedRef
  ) => {
    const { as, children, value, disabled, ...rest } = props;

    const internalRef = useRef(null);
    const ref = useCombinedRefs(forwardedRef, internalRef);

    const Component = as || 'button';
    const initialValues = { value, disabled, targetRef: ref };

    return (
      <ListboxProvider initialValues={initialValues}>
        {({ label, isExpanded }) => (
          <Component
            ref={ref}
            role="button"
            data-cs-listbox-button
            aria-haspopup="listbox"
            aria-disabled={disabled}
            aria-expanded={isExpanded}
            tabIndex={disabled ? -1 : 0}
            {...rest}
          >
            <React.Fragment>
              <span data-cs-listbox-label>{label}</span>
              <ListboxArrow />
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
    const { isExpanded, cursor, onKeyDown } = useListboxContext();

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
        data-cs-listbox-list
        aria-activedescendant={isExpanded ? cursor : undefined}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export const ListboxItem = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IListboxProps>,
    forwardedRef
  ) => {
    const { as, children, value, disabled, ...rest } = props;

    const [option, setOption] = useState<any>({});

    const {
      cursor,
      options,
      providerId,
      setOptions,
      onItemClick,
      selectedItem,
      onMouseEnter,
      onMouseLeave
    } = useListboxContext();

    useEffect(() => {
      const isExist = options.find((option) => option.value === value);
      if (isExist) return;

      const label = getLabel(children);
      const id = `option-${value}-listbox-${providerId}`;

      const option = { id, label, value };

      setOption(option);
      setOptions((prev) => [...prev, option]);
    }, [options, providerId, children]);

    const Component = as || 'li';

    return (
      <Component
        role="option"
        id={option.id}
        ref={forwardedRef}
        data-value={value}
        data-cs-listbox-item
        aria-disabled={disabled}
        data-label={option.label}
        aria-selected={cursor === value}
        onClick={() => onItemClick(value)}
        onMouseLeave={() => onMouseLeave(null)}
        onMouseEnter={() => onMouseEnter(value)}
        data-active={selectedItem.value === value}
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
    const { as, children, ...rest } = props;

    const Component = as || 'span';

    const { isExpanded } = useListboxContext();

    return (
      <Component
        aria-hidden
        ref={forwardedRef}
        data-cs-listbox-arrow
        data-expanded={isExpanded}
        {...rest}
      ></Component>
    );
  }
);

export const ListboxPopover = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IListboxProps>,
    forwardedRef
  ) => {
    const { children, ...rest } = props;

    const context = useListboxContext();
    const { targetRef, selectedItem, isExpanded, setIsExpanded, popoverRef } =
      context;

    const ref = useCombinedRefs(forwardedRef, popoverRef);

    const onOutsideClick = useCallback(() => {
      setIsExpanded(false);
    }, []);

    useEffect(() => {
      if (popoverRef.current && targetRef.current) {
        popoverRef.current.style.minWidth =
          targetRef.current.clientWidth + 'px';
      }
    }, [selectedItem]);

    useOnClickOutside(ref, onOutsideClick);

    return (
      <Popover
        {...rest}
        ref={ref}
        hidden={!isExpanded}
        targetRef={targetRef}
        data-cs-listbox-popover
      >
        <ListboxList>{children}</ListboxList>
      </Popover>
    );
  }
);

/**
 * listbox component
 */
export const Listbox = forwardRef((props: IListboxProps, forwardedRef) => {
  const { children, ...rest } = props;

  return (
    <ListboxButton {...rest} ref={forwardedRef}>
      <ListboxInput />
      <ListboxPopover>{children}</ListboxPopover>
    </ListboxButton>
  );
});

export default Listbox;

/** Types and Interfaces */

interface IListboxProps {
  children: React.ReactNode;
}

/** Display Names */

Listbox.displayName = 'Listbox';
