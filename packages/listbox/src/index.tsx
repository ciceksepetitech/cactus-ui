/**
 * @cs/component-listbox
 *
 * Listbox Component
 *
 */

import React, {
  useRef,
  useState,
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

const useListbox = () => {
  const onKeyDown = useCallback(() => {}, []);

  return {
    onKeyDown
  };
};

const useListboxItem = () => {
  const onMouseEnter = useCallback(() => {}, []);

  const onMouseLeave = useCallback(() => {}, []);

  return {
    onMouseEnter,
    onMouseLeave
  };
};

const ListboxProvider = (props) => {
  const { children, initialValues } = props;

  const { targetRef } = initialValues;

  const popoverRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState();
  const [isExpanded, setIsExpanded] = useState(false);

  const { onKeyDown } = useListbox();
  const { onMouseEnter, onMouseLeave } = useListboxItem();

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

  const onSelectedItemChange = useCallback(
    (item) => {
      setSelectedItem(item);
    },
    [setSelectedItem]
  );

  const value = {
    onKeyDown,
    isExpanded,
    popoverRef,
    onMouseEnter,
    selectedItem,
    onMouseLeave,
    setIsExpanded,
    onSelectedItemChange,
    ...initialValues
  };

  return (
    <ListboxContext.Provider value={value}>{children}</ListboxContext.Provider>
  );
};

export const ListboxInput = forwardRef((props: any, forwardedRef) => {
  const internalRef = useRef(null);
  const ref = useCombinedRefs(forwardedRef, internalRef);

  return <input ref={ref} type="hidden" data-cs-listbox-input {...props} />;
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

    const initialValues = {
      targetRef: ref
    };

    return (
      <Component ref={ref} role="button" data-cs-listbox-button {...rest}>
        <ListboxProvider initialValues={initialValues}>
          Button
          <ListboxArrow />
          {children}
        </ListboxProvider>
      </Component>
    );
  }
);

export const ListboxItem = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IListboxProps>,
    forwardedRef
  ) => {
    const { as, children, ...rest } = props;

    const Component = as || 'div';

    return (
      <Component {...rest} ref={forwardedRef} data-cs-listbox-item>
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
      <Component {...rest} ref={forwardedRef} data-cs-listbox-arrow>
        ▼
      </Component>
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
    const { targetRef, isExpanded, setIsExpanded, popoverRef } = context;

    const ref = useCombinedRefs(forwardedRef, popoverRef);

    const onOutsideClick = useCallback(() => {
      setIsExpanded(false);
    }, []);

    useOnClickOutside(ref, onOutsideClick);

    if (!isExpanded) return null;

    return (
      <Popover
        {...rest}
        ref={ref}
        targetRef={targetRef}
        data-cs-listbox-popover
      >
        {children}
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
      <ListboxPopover
        style={{
          padding: '5px 10px',
          borderRadius: '4px',
          background: 'white',
          border: '1px solid #eee'
        }}
      >
        {children}
      </ListboxPopover>
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
