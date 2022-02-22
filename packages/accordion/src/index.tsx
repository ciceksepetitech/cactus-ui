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
  useMemo,
  useState,
  useContext,
  forwardRef,
  createContext
} from 'react';
import {
  useLatestValue,
  useIsomorphicLayoutEffect
} from '@ciceksepeti/cui-hooks';
import { PolymorphicComponentProps, isFunction } from '@ciceksepeti/cui-utils';

const initialValue = {} as IAccordionContext;
const AccordionContext = createContext(initialValue);

let _accordionProviderId = 0;
const generateAccordionProviderId = () => ++_accordionProviderId;

let _accordionIndex = -1;
const generateAccordionIndex = () => ++_accordionIndex;

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

  const providerId = useMemo(() => generateAccordionProviderId(), []);

  const providerValue: IAccordionContext = {
    providerId,
    accordions,
    setAccordions,
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
    const {
      as,
      indexes,
      children,
      onChange,
      single = true,
      defaultIndexes,
      collapsible = true,
      ...rest
    } = props;

    const onChangeRef = useLatestValue<(index: number) => void>(onChange);
    const [expandedIndexes, setExpandedIndexes] = useState<number[]>(
      indexes || defaultIndexes
    );

    const Component = as || 'div';

    const initialValues: IAccordionProviderProps = {
      single,
      collapsible,
      defaultIndexes,
      expandedIndexes,
      setExpandedIndexes,
      onChange: onChangeRef.current
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
    const { as, children, disabled, ...rest } = props;

    const Component = as || 'button';

    const [accordion, setAccordion] = useState<IAccordion>();
    const { expandedIndexes, providerId, setAccordions } =
      useAccordionContext();

    useIsomorphicLayoutEffect(() => {
      const index = generateAccordionIndex();
      const id = `accordion-button-${index}-${providerId}`;

      const accordion = {
        id,
        index,
        disabled
      } as IAccordion;

      setAccordion(accordion);
      setAccordions((previousAccordions) => [...previousAccordions, accordion]);

      return () =>
        setAccordions((previousAccordions) =>
          previousAccordions.filter(({ id }) => id !== accordion.id)
        );
    }, [disabled, providerId]);

    const isExpanded = expandedIndexes.includes(accordion.index);

    return (
      <Component
        ref={forwardedRef}
        disabled={disabled}
        aria-disabled={disabled}
        data-cui-accordion-button
        aria-expanded={isExpanded}
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
    const { as, children, ...rest } = props;

    const Component = as || 'div';

    return (
      <Component
        role="region"
        ref={forwardedRef}
        data-cui-accordion-content
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

/** Types and Interfaces */

export interface IAccordionProviderProps {
  single?: boolean;
  collapsible?: boolean;
  defaultIndexes?: number[];
  expandedIndexes?: number[];
  onChange?: (index: number) => void;
  setExpandedIndexes?: React.Dispatch<React.SetStateAction<number[]>>;
}

export interface IAccordionContext extends IAccordionProviderProps {
  providerId: number;
  accordions: IAccordion[];
  setAccordions: React.Dispatch<React.SetStateAction<IAccordion[]>>;
}

export interface IAccordionProps {
  single?: boolean;
  indexes?: number[];
  collapsible?: boolean;
  defaultIndexes?: number[];
  children: React.ReactNode;
  onChange?: (index: number) => void;
}

export interface IAccordion {
  id: string;
  index: number;
  disabled?: boolean;
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
