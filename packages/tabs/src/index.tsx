/**
 * @ciceksepeti/cui-tabs
 *
 * @see https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel
 *
 * Tabs Component
 *
 * The Tabs component consists of clickable tabs, that are aligned side by side.
 * Tabs make it easy to explore and switch between different views. Tabs organize
 * and allow navigation between groups of content that are related and at the
 * same level of hierarchy.
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
  isFunction,
  mergeEventHandlers,
  PolymorphicComponentProps
} from '@ciceksepeti/cui-utils';
import {
  useLatestValue,
  useCombinedRefs,
  useIsomorphicLayoutEffect
} from '@ciceksepeti/cui-hooks';

const initialValue = {} as ITabsContext;
const TabsContext = createContext(initialValue);

let _tabProviderId = 0;
const generateTabProviderId = () => ++_tabProviderId;

export const useTabsContext = () => {
  const context = useContext(TabsContext);

  if (context === undefined)
    throw new Error('useTabsContext must be used within a TabsProvider');

  return context;
};

const TabsProvider = (props) => {
  const { children, initialValues } = props;
  const {
    onChange,
    orientation,
    isControlled,
    activationType,
    selectedTabIndex,
    setFocusedTabIndex,
    setSelectedTabIndex
  } = initialValues;

  const tabIdRef = useRef<number>(-1);
  const tabPanelIdRef = useRef<number>(-1);
  const [tabs, setTabs] = useState<ITab[]>([]);
  const [cursor, setCursor] = useState<number>();
  const [panels, setPanels] = useState<IPanel[]>([]);
  const onChangeRef =
    useLatestValue<(index: number, id: string) => void>(onChange);

  const providerId = useMemo(() => generateTabProviderId(), []);

  /**
   * find first undisabled tab to set initially
   */
  useIsomorphicLayoutEffect(() => {
    if (tabs.length === 0 || selectedTabIndex) return;

    const selectableTabs = tabs.filter(({ disabled }) => !disabled);

    if (selectableTabs.length > 0) {
      const selectableFirstTab = selectableTabs[0];

      if (!selectableFirstTab) return;

      const { index: selectableTabIndex } = selectableFirstTab;

      setCursor(selectableTabIndex);
      setFocusedTabIndex(selectableTabIndex);
      setSelectedTabIndex(selectableTabIndex);
    }
  }, [isControlled, tabs]);

  const setArrowSelection = useCallback(
    (tab: ITab) => {
      const { id, index: nextTabIndex, ref } = tab;

      setCursor(nextTabIndex);
      ref.current?.focus();

      if (activationType === TabsActivation.Auto) {
        if (isControlled) {
          onChangeRef.current?.(nextTabIndex, id);
          return;
        }

        setSelectedTabIndex(nextTabIndex);
      }

      setFocusedTabIndex(nextTabIndex);
    },
    [isControlled, activationType]
  );

  const clickSelection = useCallback(
    (tab: ITab) => {
      const { id, index: nextTabIndex, ref } = tab;

      ref.current?.focus();
      setCursor(nextTabIndex);

      if (isControlled) {
        onChangeRef.current?.(nextTabIndex, id);
        return;
      }

      setSelectedTabIndex(nextTabIndex);
      setFocusedTabIndex(nextTabIndex);
    },
    [isControlled]
  );

  const handleArrowSelection = useCallback(
    (currentIndex: number, direction: boolean, tabs: ITab[]) => {
      const selectableTabs = tabs.filter(({ disabled }) => !disabled);
      const selectedTabIndex = selectableTabs.findIndex(
        ({ index }) => index === currentIndex
      );

      const nextCursor = direction
        ? (selectedTabIndex + 1) % selectableTabs.length
        : (selectedTabIndex - 1 + selectableTabs.length) %
          selectableTabs.length;

      const tab = selectableTabs[nextCursor];
      setArrowSelection(tab);
    },
    [activationType, setArrowSelection]
  );

  const onKeyDown = useCallback(
    (event) => {
      switch (event.key) {
        case ' ':
        case 'Enter':
        case 'Spacebar': {
          const tab = tabs[cursor];

          if (tab && !tab.disabled) {
            event.preventDefault();
            !isControlled && setSelectedTabIndex(cursor);
            isControlled && onChangeRef.current?.(cursor, tab.id);
          }

          return;
        }

        case 'ArrowUp': {
          if (orientation === TabsOrientation.Horizontal) return;

          event.preventDefault();
          handleArrowSelection(cursor, false, tabs);

          return;
        }

        case 'ArrowDown': {
          if (orientation === TabsOrientation.Horizontal) return;

          event.preventDefault();
          handleArrowSelection(cursor, true, tabs);

          return;
        }

        case 'ArrowLeft': {
          if (orientation === TabsOrientation.Vertical) return;

          event.preventDefault();
          handleArrowSelection(cursor, false, tabs);

          return;
        }

        case 'ArrowRight': {
          if (orientation === TabsOrientation.Vertical) return;

          event.preventDefault();
          handleArrowSelection(cursor, true, tabs);

          return;
        }

        case 'Home': {
          event.preventDefault();

          const selectableTabs = tabs.filter(({ disabled }) => !disabled);
          setArrowSelection(selectableTabs[0]);

          return;
        }

        case 'End': {
          event.preventDefault();

          const selectableTabs = tabs.filter(({ disabled }) => !disabled);
          setArrowSelection(selectableTabs[selectableTabs.length - 1]);

          return;
        }

        default:
          return;
      }
    },
    [cursor, orientation, isControlled, handleArrowSelection, tabs]
  );

  const providerValue: ITabsContext = {
    tabs,
    panels,
    setTabs,
    tabIdRef,
    setPanels,
    onKeyDown,
    providerId,
    tabPanelIdRef,
    clickSelection,
    ...initialValues
  };

  return (
    <TabsContext.Provider value={providerValue}>
      {children}
    </TabsContext.Provider>
  );
};

/**
 * tabs component
 */
export const Tabs = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, ITabsProps>,
    forwardedRef
  ) => {
    showTabsWarnings(Tabs.displayName, props);

    const {
      as,
      index,
      children,
      onChange,
      defaultIndex,
      activationType = TabsActivation.Auto,
      orientation = TabsOrientation.Horizontal,
      ...rest
    } = props;

    const Component = as || 'div';

    const isControlled = index >= 0;
    const initialSelectedTabIndex = index || defaultIndex || 0;

    const [focusedTabIndex, setFocusedTabIndex] = useState<number>();
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(
      initialSelectedTabIndex
    );

    const initialValues: ITabsProviderProps = {
      onChange,
      orientation,
      isControlled,
      defaultIndex,
      activationType,
      focusedTabIndex,
      setFocusedTabIndex,
      setSelectedTabIndex,
      selectedTabIndex: isControlled ? index : selectedTabIndex
    };

    return (
      <TabsProvider initialValues={initialValues}>
        <Component
          {...rest}
          data-cui-tabs
          ref={forwardedRef}
          data-orientation={orientation}
        >
          {isFunction(children)
            ? children({ selectedTabIndex, focusedTabIndex })
            : children}
        </Component>
      </TabsProvider>
    );
  }
);

export default Tabs;

/**
 * tab-list component
 */
export const TabList = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C>,
    forwardedRef
  ) => {
    const { as, children, ...rest } = props;

    const Component = as || 'div';

    const { orientation, onKeyDown } = useTabsContext();

    return (
      <Component
        {...rest}
        role="tablist"
        data-cui-tab-list
        ref={forwardedRef}
        onKeyDown={onKeyDown}
        aria-orientation={orientation}
      >
        {children}
      </Component>
    );
  }
);

/**
 * tab component
 */
export const Tab = forwardRef(
  <C extends React.ElementType = 'button'>(
    props: PolymorphicComponentProps<C, ITabProps>,
    forwardedRef
  ) => {
    const { id, as, children, onClick, disabled, ...rest } = props;

    const Component = as || 'button';

    const internalRef = useRef(null);
    const [tab, setTab] = useState<ITab>({} as ITab);
    const ref = useCombinedRefs(forwardedRef, internalRef);

    const {
      panels,
      setTabs,
      tabIdRef,
      providerId,
      orientation,
      clickSelection,
      selectedTabIndex
    } = useTabsContext();

    useIsomorphicLayoutEffect(() => {
      const index = ++tabIdRef.current;
      const _id = id || `tab-${index}-${providerId}`;
      const tab = { id: _id, index, ref, disabled } as ITab;

      setTab(tab);
      setTabs((previousTabs) => [...previousTabs, tab]);

      return () =>
        setTabs((previousTabs) =>
          previousTabs.filter(({ id }) => id !== tab.id)
        );
    }, [id, disabled, providerId]);

    const type =
      Component === 'button' && props.type == null ? 'button' : props.type;

    const isTabSelected = selectedTabIndex === tab.index;
    const controlledPanel = panels[tab.index]?.id;

    return (
      <Component
        type={type}
        {...rest}
        ref={ref}
        role="tab"
        id={tab.id}
        data-cui-tab
        disabled={disabled}
        aria-disabled={disabled}
        aria-selected={isTabSelected}
        data-orientation={orientation}
        aria-controls={controlledPanel}
        tabIndex={isTabSelected ? 0 : -1}
        onClick={mergeEventHandlers(onClick, () => clickSelection(tab))}
      >
        {children}
      </Component>
    );
  }
);

/**
 * tab-panel-list component
 */
export const TabPanelList = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C>,
    forwardedRef
  ) => {
    const { as, children, ...rest } = props;

    const Component = as || 'div';

    return (
      <Component {...rest} ref={forwardedRef} data-cui-tab-panel-list>
        {children}
      </Component>
    );
  }
);

/**
 * tab-panel component
 */
export const TabPanel = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C>,
    forwardedRef
  ) => {
    const { id, as, children, ...rest } = props;

    const Component = as || 'div';

    const [panel, setPanel] = useState<IPanel>({} as IPanel);
    const { tabs, setPanels, providerId, tabPanelIdRef, selectedTabIndex } =
      useTabsContext();

    useIsomorphicLayoutEffect(() => {
      const index = ++tabPanelIdRef.current;
      const _id = id || `tab-panel-${index}-${providerId}`;
      const panel = { id: _id, index } as IPanel;

      setPanel(panel);
      setPanels((previousPanels) => [...previousPanels, panel]);

      return () =>
        setPanels((previousPanels) =>
          previousPanels.filter(({ id }) => id !== panel.id)
        );
    }, [id, providerId]);

    const isTabDisabled = tabs[panel.index]?.disabled;
    const isPanelActive = selectedTabIndex === panel.index && !isTabDisabled;

    return (
      <Component
        {...rest}
        id={panel.id}
        role="tabpanel"
        ref={forwardedRef}
        data-cui-tab-panel
        tabIndex={isPanelActive ? 0 : -1}
        aria-labelledby={tabs[panel.index]?.id}
        hidden={selectedTabIndex === undefined ? false : !isPanelActive}
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
const showTabsWarnings = (componentName: string, props: ITabsProps) => {
  if (process.env.NODE_ENV === 'production') return;

  if (props.index && props.defaultIndex) {
    const warning = `@ciceksepeti/cui-tabs - ${componentName}: the index prop is provided with defaultIndex. To make tab controlled remove defaultIndex and add onChange prop or remove index props and leave only defaultIndex prop.`;
    console.warn(warning);
  }

  if (props.index === undefined && props.onChange) {
    const warning = `@ciceksepeti/cui-tabs - ${componentName}: the onChange prop is provided without providing index prop. To make tab controlled, add index prop. To use tab as uncontrolled component with initial index, use defaultIndex prop and remove onChange prop.`;
    console.warn(warning);
  }

  if (props.index !== undefined && !props.onChange) {
    const warning = `@ciceksepeti/cui-tabs - ${componentName}: the index prop is provided without providing onChange prop. To make tab work, add onChange props, remove index prop and use it as uncontrolled component or only add defaultIndex prop.`;
    console.warn(warning);
  }
};

/** Types, Enums and Interfaces */

export interface ITabsChildrenProps {
  focusedTabIndex: number;
  selectedTabIndex: number;
}

export interface ITabsProps {
  index?: number;
  defaultIndex?: number;
  orientation?: TabsOrientation;
  activationType?: TabsActivation;
  onChange?: (index: number, id: string) => void;
  children: ((props: ITabsChildrenProps) => React.ReactNode) | React.ReactNode;
}

export interface ITabsProviderProps {
  defaultIndex: number;
  isControlled: boolean;
  focusedTabIndex: number;
  selectedTabIndex: number;
  orientation?: TabsOrientation;
  activationType?: TabsActivation;
  clickSelection?: (tab: ITab) => void;
  onChange?: (index: number, id: string) => void;
  setFocusedTabIndex: React.Dispatch<React.SetStateAction<number>>;
  setSelectedTabIndex: React.Dispatch<React.SetStateAction<number>>;
}

export interface ITabProps {
  disabled?: boolean;
  children: React.ReactNode;
}

export interface ITab {
  id: string;
  index: number;
  disabled?: boolean;
  ref: React.MutableRefObject<HTMLElement>;
}

export interface IPanel {
  id: string;
  index: number;
}

export interface ITabsContext extends ITabsProviderProps {
  tabs: ITab[];
  panels: IPanel[];
  providerId: number;
  onKeyDown: () => void;
  tabIdRef: React.MutableRefObject<number>;
  tabPanelIdRef: React.MutableRefObject<number>;
  setTabs: React.Dispatch<React.SetStateAction<ITab[]>>;
  setPanels: React.Dispatch<React.SetStateAction<IPanel[]>>;
}

export enum TabsOrientation {
  Vertical = 'vertical',
  Horizontal = 'horizontal'
}

export enum TabsActivation {
  Auto = 'auto',
  Manual = 'manual'
}

/** Display Names */

Tab.displayName = 'Tab';
Tabs.displayName = 'Tabs';
TabList.displayName = 'TabList';
TabPanel.displayName = 'TabPanel';
