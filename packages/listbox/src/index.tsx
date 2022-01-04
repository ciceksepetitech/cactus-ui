/**
 * @cs/component-listbox
 *
 * Listbox Component
 *
 */

import React, {
  useRef,
  useState,
  Children,
  useEffect,
  forwardRef,
  useContext,
  useCallback,
  createContext
} from 'react';
import {
  useCombinedRefs,
  useEventListener,
  useOnClickOutside
} from '@cs/component-hooks';
import Popover from '@cs/component-popover';
import { PolymorphicComponentProps } from '@cs/component-utils';

const initialValue = {} as any;
const ListboxContext = createContext(initialValue);

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
    options,
    cursor,
    setSelectedItem,
    isExpanded,
    setIsExpanded,
    setCursor
  } = props;

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
        case 'Spacebar': {
          event.preventDefault();
          if (item) setSelectedItem(item);
          return;
        }

        case 'Enter': {
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
  const { options, setSelectedItem, setCursor } = props;

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

  const { value, targetRef } = initialValues;

  const popoverRef = useRef(null);
  const [cursor, setCursor] = useState({});
  const [options, setOptions] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>({});

  useEffect(() => {
    if (!selectedItem.value && options.length > 0) {
      if (value) {
        const item = options.find((option) => option.value === value);
        setSelectedItem(item);
      } else {
        setSelectedItem(options[0]);
      }
    }
  }, [value, options]);

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
    onKeyDown,
    setOptions,
    isExpanded,
    popoverRef,
    onItemClick,
    onMouseEnter,
    selectedItem,
    onMouseLeave,
    setIsExpanded,
    setSelectedItem,
    ...initialValues
  };

  return (
    <ListboxContext.Provider value={providerValue}>
      {typeof children === 'function'
        ? children({ label: selectedItem.label })
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
    const { as, children, value, ...rest } = props;

    const internalRef = useRef(null);
    const ref = useCombinedRefs(forwardedRef, internalRef);

    const Component = as || 'button';
    const initialValues = { value, targetRef: ref };

    return (
      <Component ref={ref} role="button" data-cs-listbox-button {...rest}>
        <ListboxProvider initialValues={initialValues}>
          {({ label }) => (
            <React.Fragment>
              <span data-cs-listbox-label>{label}</span>
              <ListboxArrow />
              {children}
            </React.Fragment>
          )}
        </ListboxProvider>
      </Component>
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
    const { isExpanded, onKeyDown } = useListboxContext();

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
    const { as, children, value, ...rest } = props;

    const {
      cursor,
      options,
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
      const option = { label, value };
      setOptions((prev) => [...prev, option]);
    }, [options, children]);

    const Component = as || 'li';

    return (
      <Component
        role="option"
        ref={forwardedRef}
        data-cs-listbox-item
        onClick={() => onItemClick(value)}
        onMouseLeave={() => onMouseLeave(null)}
        onMouseEnter={() => onMouseEnter(value)}
        style={{
          backgroundColor: cursor === value ? 'steelblue' : '',
          fontWeight: selectedItem.value === value ? 'bold' : 'unset'
        }}
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

    return (
      <Component
        {...rest}
        aria-hidden
        ref={forwardedRef}
        data-cs-listbox-arrow
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
