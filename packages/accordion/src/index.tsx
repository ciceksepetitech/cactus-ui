/**
 * @ciceksepeti/cui-accordion
 *
 * Accordion Component
 *
 * An accordion is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content.
 * The headings function as controls that enable users to reveal or hide their associated sections of content.
 * Accordions are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page.
 *
 * @see https://www.w3.org/TR/wai-aria-practices-1.2/#accordion
 */

import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useContext,
  forwardRef,
  useCallback,
  createContext
} from 'react';
import {
  useLatestValue,
  useCombinedRefs,
  useIsomorphicLayoutEffect
} from '@ciceksepeti/cui-hooks';
import {
  isFunction,
  mergeEventHandlers,
  PolymorphicComponentProps
} from '@ciceksepeti/cui-utils';

const initialValue = {} as IAccordionContext;
const AccordionContext = createContext(initialValue);

let _accordionProviderId = 0;
const generateAccordionProviderId = () => ++_accordionProviderId;

let _accordionIndex = -1;
const generateAccordionIndex = () => ++_accordionIndex;

let _accordionContentIndex = -1;
const generateAccordionContentIndex = () => ++_accordionContentIndex;

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);

  if (context === undefined)
    throw new Error(
      'useAccordionContext must be used within a AccordionProvider'
    );

  return context;
};

const AccordionProvider = (props) => {
  const { children, initialValues } = props;

  const [accordions, setAccordions] = useState<IAccordion[]>([]);
  const [accordionContents, setAccordionContents] = useState<
    IAccordionContent[]
  >([]);

  const {
    single,
    collapsible,
    onChangeRef,
    isControlled,
    setExpandedIndexes,
    disableOptionalArrowKeys
  } = initialValues;

  const providerId = useMemo(() => generateAccordionProviderId(), []);

  const toggleAccordion = useCallback(
    (accordion: IAccordion) => {
      const { index, disabled } = accordion;

      if (disabled || !collapsible) return;

      if (isControlled) {
        onChangeRef.current?.(index);
        return;
      }

      setExpandedIndexes((prevExpandedIndexes) => {
        if (single) {
          if (prevExpandedIndexes.includes(index)) return [];
          else return [index];
        }

        if (prevExpandedIndexes.includes(index)) {
          return prevExpandedIndexes.filter(
            (index) => index !== accordion.index
          );
        } else {
          return [...prevExpandedIndexes, index];
        }
      });
    },
    [single, collapsible, isControlled]
  );

  const handleArrowSelection = useCallback(
    (currentIndex: number, direction: boolean, accordions: IAccordion[]) => {
      const selectableAccordions = accordions.filter(
        ({ disabled }) => !disabled
      );

      const selectedAccordionIndex = selectableAccordions.findIndex(
        ({ index }) => index === currentIndex
      );

      const { length } = selectableAccordions;
      const nextCursor = direction
        ? (selectedAccordionIndex + 1) % length
        : (selectedAccordionIndex - 1 + length) % length;

      const accordion = selectableAccordions[nextCursor];
      accordion.ref.current.focus();
    },
    []
  );

  /**
   * @see https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction
   */
  const onKeyDownHandler = useCallback(
    (event, accordion: IAccordion) => {
      switch (event.key) {
        case ' ':
        case 'Enter':
        case 'Spacebar': {
          if (accordion && !accordion.disabled) {
            onChangeRef.current?.(accordion.id);
          }

          return;
        }

        case 'ArrowUp': {
          if (disableOptionalArrowKeys) return;

          event.preventDefault();
          handleArrowSelection(accordion.index, true, accordions);
          return;
        }

        case 'ArrowDown': {
          if (disableOptionalArrowKeys) return;

          event.preventDefault();
          handleArrowSelection(accordion.index, false, accordions);
          return;
        }

        case 'Home': {
          if (disableOptionalArrowKeys) return;

          event.preventDefault();

          const selectableAccordions = accordions.filter(
            ({ disabled }) => !disabled
          );

          selectableAccordions[0]?.ref.current.focus();

          return;
        }

        case 'End': {
          if (disableOptionalArrowKeys) return;

          event.preventDefault();

          const selectableAccordions = accordions.filter(
            ({ disabled }) => !disabled
          );

          selectableAccordions[
            selectableAccordions.length - 1
          ]?.ref.current.focus();

          return;
        }

        default:
          return;
      }
    },
    [handleArrowSelection, disableOptionalArrowKeys, accordions]
  );

  const providerValue: IAccordionContext = {
    providerId,
    accordions,
    setAccordions,
    toggleAccordion,
    onKeyDownHandler,
    accordionContents,
    setAccordionContents,
    ...initialValues
  };

  return (
    <AccordionContext.Provider value={providerValue}>
      {children({ providerId })}
    </AccordionContext.Provider>
  );
};

/**
 * accordion component
 */
export const Accordion = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IAccordionProps>,
    forwardedRef
  ) => {
    showAccordionWarnings(Accordion.displayName, props);

    const {
      as,
      indexes,
      children,
      onChange,
      single = true,
      defaultIndexes,
      collapsible = true,
      disableOptionalArrowKeys = false,
      ...rest
    } = props;

    const isControlled = !!indexes;
    const initialIndexes = indexes || defaultIndexes || [];

    const onChangeRef = useLatestValue<(index: number) => void>(onChange);
    const [expandedIndexes, setExpandedIndexes] =
      useState<number[]>(initialIndexes);

    const Component = as || 'div';

    // handles prop indexes change when controlled!
    useEffect(() => {
      if (indexes) setExpandedIndexes(indexes);
    }, [indexes]);

    const initialValues: IAccordionProviderProps = {
      single,
      collapsible,
      onChangeRef,
      isControlled,
      defaultIndexes,
      expandedIndexes,
      setExpandedIndexes,
      disableOptionalArrowKeys
    };

    return (
      <AccordionProvider initialValues={initialValues}>
        {({ providerId }) => (
          <Component
            id={`accordion-${providerId}`}
            {...rest}
            ref={forwardedRef}
            data-cui-accordion
          >
            {isFunction(children) ? children({ expandedIndexes }) : children}
          </Component>
        )}
      </AccordionProvider>
    );
  }
);

export default Accordion;

/**
 * accordion-header component
 */
export const AccordionHeader = forwardRef(
  <C extends React.ElementType = 'h3'>(
    props: PolymorphicComponentProps<C, IAccordionHeaderProps>,
    forwardedRef
  ) => {
    showAccordionHeaderWarnings(AccordionHeader.displayName, props);

    const { as, children, ...rest } = props;

    const Component = as || 'h3';

    return (
      <Component data-cui-accordion-header ref={forwardedRef} {...rest}>
        {children}
      </Component>
    );
  }
);

/**
 * accordion-button component
 */
export const AccordionButton = forwardRef(
  <C extends React.ElementType = 'button'>(
    props: PolymorphicComponentProps<C, IAccordionButtonProps>,
    forwardedRef
  ) => {
    const { id, as, children, disabled, onClick, onKeyDown, ...rest } = props;

    const Component = as || 'button';

    const internalRef = useRef(null);
    const ref = useCombinedRefs(forwardedRef, internalRef);

    const [accordion, setAccordion] = useState<IAccordion>({} as IAccordion);

    const {
      providerId,
      setAccordions,
      toggleAccordion,
      expandedIndexes,
      onKeyDownHandler,
      accordionContents
    } = useAccordionContext();

    useIsomorphicLayoutEffect(() => {
      const index = generateAccordionIndex();
      const _id = id || `accordion-button-${index}-${providerId}`;

      const accordion = {
        ref,
        index,
        id: _id,
        disabled
      } as IAccordion;

      setAccordion(accordion);
      setAccordions((previousAccordions) => [...previousAccordions, accordion]);

      return () =>
        setAccordions((previousAccordions) =>
          previousAccordions.filter(({ id }) => id !== accordion.id)
        );
    }, [id, disabled, providerId]);

    const controls = accordionContents[accordion.index]?.id;
    const isExpanded = expandedIndexes.includes(accordion.index);

    return (
      <Component
        ref={ref}
        id={accordion.id}
        disabled={disabled}
        aria-controls={controls}
        aria-disabled={disabled}
        data-cui-accordion-button
        aria-expanded={isExpanded}
        onClick={mergeEventHandlers(onClick, () => toggleAccordion(accordion))}
        onKeyDown={mergeEventHandlers(onKeyDown, (event) =>
          onKeyDownHandler(event, accordion)
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

/**
 * accordion-content component
 */
export const AccordionContent = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IAccordionContentProps>,
    forwardedRef
  ) => {
    const { id, as, children, ...rest } = props;

    const Component = as || 'div';

    const { accordions, expandedIndexes, providerId, setAccordionContents } =
      useAccordionContext();

    const [accordionContent, setAccordionContent] = useState<IAccordionContent>(
      {} as IAccordionContent
    );

    useIsomorphicLayoutEffect(() => {
      const index = generateAccordionContentIndex();
      const _id = id || `accordion-content-${index}-${providerId}`;

      const accordionContent = {
        index,
        id: _id
      } as IAccordion;

      setAccordionContent(accordionContent);
      setAccordionContents((previousAccordionContents) => [
        ...previousAccordionContents,
        accordionContent
      ]);

      return () =>
        setAccordionContents((previousAccordionContents) =>
          previousAccordionContents.filter(
            ({ id }) => id !== accordionContent.id
          )
        );
    }, [id, providerId]);

    const labelledby = accordions[accordionContent.index]?.id;
    const isExpanded = expandedIndexes.includes(accordionContent.index);

    return (
      <Component
        role="region"
        ref={forwardedRef}
        hidden={!isExpanded}
        id={accordionContent.id}
        aria-labelledby={labelledby}
        {...rest}
        data-expanded={isExpanded}
        data-cui-accordion-content
      >
        {children}
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
const showAccordionWarnings = (
  componentName: string,
  props: IAccordionProps
) => {
  if (process.env.NODE_ENV === 'production') return;

  if (props.indexes && props.defaultIndexes) {
    const warning = `@ciceksepeti/cui-accordion - ${componentName}: the indexes prop is provided with defaultIndexes. To make accordion controlled remove defaultIndexes and add onChange prop or remove indexes props and leave only defaultIndexes prop.`;
    console.warn(warning);
  }

  if (!props.indexes && props.onChange) {
    const warning = `@ciceksepeti/cui-accordion - ${componentName}: the onChange prop is provided without providing indexes prop. To make accordion controlled, add indexes prop. To use accordion as uncontrolled component with initial indexes, use defaultIndexes prop and remove onChange prop.`;
    console.warn(warning);
  }

  if (props.indexes && !props.onChange) {
    const warning = `@ciceksepeti/cui-accordion - ${componentName}: the indexes prop is provided without providing onChange prop. To make accordion work, add onChange props, remove indexes prop and use it as uncontrolled component or only add defaultIndexes prop.`;
    console.warn(warning);
  }
};

/**
 * handles development environment warning messages
 * @param componentName
 * @param props
 * @returns
 */
const showAccordionHeaderWarnings = (
  componentName: string,
  props: React.HTMLAttributes<HTMLHeadingElement>
) => {
  if (process.env.NODE_ENV === 'production') return;

  const childrenArray = React.Children.toArray(props.children);

  if (childrenArray.length > 1) {
    const warning = `@ciceksepeti/cui-accordion - ${componentName}: the button element is the only element inside the heading element. That is, if there are other visually persistent elements, they are not included inside the heading element. @see https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties.`;
    console.warn(warning);
  }
};

/** Types and Interfaces */

export interface IAccordionProviderProps {
  single?: boolean;
  collapsible?: boolean;
  isControlled: boolean;
  defaultIndexes?: number[];
  expandedIndexes?: number[];
  disableOptionalArrowKeys?: boolean;
  toggleAccordion?: (accordion: IAccordion) => void;
  onChangeRef?: React.MutableRefObject<(index: number) => void>;
  setExpandedIndexes?: React.Dispatch<React.SetStateAction<number[]>>;
}

export interface IAccordionContext extends IAccordionProviderProps {
  providerId: number;
  accordions: IAccordion[];
  accordionContents: IAccordionContent[];
  setAccordions: React.Dispatch<React.SetStateAction<IAccordion[]>>;
  onKeyDownHandler: (
    event: Event | React.SyntheticEvent<Element, Event>,
    accordion: IAccordion
  ) => void;
  setAccordionContents: React.Dispatch<
    React.SetStateAction<IAccordionContent[]>
  >;
}

export interface IAccordionProps {
  single?: boolean;
  indexes?: number[];
  collapsible?: boolean;
  defaultIndexes?: number[];
  children: React.ReactNode;
  disableOptionalArrowKeys?: boolean;
  onChange?: (index: number) => void;
}

export interface IAccordion {
  id: string;
  index: number;
  disabled?: boolean;
  ref: React.MutableRefObject<HTMLButtonElement>;
}

export interface IAccordionContent {
  id: string;
  index: number;
}

export interface IAccordionHeaderProps {
  children: React.ReactNode;
}

export interface IAccordionButtonProps {
  children: React.ReactNode;
}

export interface IAccordionItemProps {
  disabled?: boolean;
  children: React.ReactNode;
}

export interface IAccordionContentProps {
  children: React.ReactNode;
}

/** Display Names */

Accordion.displayName = 'Accordion';
AccordionHeader.displayName = 'AccordionHeader';
AccordionButton.displayName = 'AccordionButton';
AccordionContent.displayName = 'AccordionContent';
