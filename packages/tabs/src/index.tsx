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

let _tabId = -1;
const generateTabId = () => ++_tabId;

let _tabPanelId = -1;
const generateTabPanelId = () => ++_tabPanelId;

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
    activationType,
    setFocusedTabIndex,
    setSelectedTabIndex
  } = initialValues;

  const [tabs, setTabs] = useState<ITab[]>([]);
  const [cursor, setCursor] = useState<number>(0);
  const [panels, setPanels] = useState<IPanel[]>([]);
  const onChangeRef = useLatestValue<(index: number) => void>(onChange);

  const providerId = useMemo(() => generateTabProviderId(), []);

  const setSelection = useCallback((tab: ITab) => {
    const { index: nextTabIndex, ref } = tab;

    setCursor(nextTabIndex);
    ref.current?.focus();

    if (activationType === TabsActivation.Auto) {
      setSelectedTabIndex(nextTabIndex);
      onChangeRef.current?.(nextTabIndex);
    }

    setFocusedTabIndex(nextTabIndex);
  }, []);

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
      setSelection(tab);
    },
    [activationType]
  );

  const onKeyDown = useCallback(
    (event) => {
      switch (event.key) {
        case ' ':
        case 'Enter':
        case 'Spacebar': {
          const tab = tabs[cursor];

          if (tab && !tab.disabled) {
            setSelectedTabIndex(cursor);
            onChangeRef.current?.(cursor);
          }

          return;
        }

        case 'ArrowUp': {
          event.preventDefault();

          if (orientation === TabsOrientation.Horizontal) return;
          handleArrowSelection(cursor, false, tabs);

          return;
        }

        case 'ArrowDown': {
          event.preventDefault();

          if (orientation === TabsOrientation.Horizontal) return;
          handleArrowSelection(cursor, true, tabs);

          return;
        }

        case 'ArrowLeft': {
          event.preventDefault();

          if (orientation === TabsOrientation.Vertical) return;
          handleArrowSelection(cursor, false, tabs);

          return;
        }

        case 'ArrowRight': {
          event.preventDefault();

          if (orientation === TabsOrientation.Vertical) return;
          handleArrowSelection(cursor, true, tabs);

          return;
        }

        case 'Home': {
          event.preventDefault();

          const selectableTabs = tabs.filter(({ disabled }) => !disabled);
          setSelection(selectableTabs[0]);

          return;
        }

        case 'End': {
          event.preventDefault();

          const selectableTabs = tabs.filter(({ disabled }) => !disabled);
          setSelection(selectableTabs[selectableTabs.length - 1]);

          return;
        }

        default:
          break;
      }
    },
    [cursor, orientation, handleArrowSelection, tabs]
  );

  const providerValue: ITabsContext = {
    tabs,
    panels,
    setTabs,
    setPanels,
    onKeyDown,
    providerId,
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
    const {
      as,
      children,
      onChange,
      defaultIndex,
      activationType = TabsActivation.Auto,
      orientation = TabsOrientation.Horizontal,
      ...rest
    } = props;

    const Component = as || 'div';

    const initiallySelectedTabIndex =
      activationType === TabsActivation.Auto ? defaultIndex || 0 : defaultIndex;

    const [focusedTabIndex, setFocusedTabIndex] = useState<number>();
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(
      initiallySelectedTabIndex
    );

    const initialValues: ITabsProviderProps = {
      onChange,
      orientation,
      activationType,
      focusedTabIndex,
      selectedTabIndex,
      setFocusedTabIndex,
      setSelectedTabIndex
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
        data-orientation={orientation}
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
    const { as, children, onClick, disabled, ...rest } = props;

    const Component = as || 'button';

    const internalRef = useRef(null);
    const [tab, setTab] = useState<ITab>({} as ITab);
    const ref = useCombinedRefs(forwardedRef, internalRef);

    const {
      panels,
      setTabs,
      providerId,
      selectedTabIndex,
      setSelectedTabIndex
    } = useTabsContext();

    useIsomorphicLayoutEffect(() => {
      const index = generateTabId();
      const id = `tab-${index}-${providerId}`;
      const tab = { id, index, ref, disabled } as ITab;

      setTab(tab);
      setTabs((previousTabs) => [...previousTabs, tab]);

      return () =>
        setTabs((previousTabs) =>
          previousTabs.filter(({ id }) => id !== tab.id)
        );
    }, [disabled, providerId]);

    const type =
      Component === 'button' && props.type == null ? 'button' : props.type;

    const isTabSelected = selectedTabIndex === tab.index;

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
        tabIndex={isTabSelected ? 0 : -1}
        aria-controls={panels[tab.index]?.id}
        onClick={mergeEventHandlers(onClick, () =>
          setSelectedTabIndex(tab.index)
        )}
      >
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
    const { as, children, ...rest } = props;

    const Component = as || 'div';

    const [panel, setPanel] = useState<IPanel>({} as IPanel);
    const { tabs, setPanels, providerId, selectedTabIndex } = useTabsContext();

    useIsomorphicLayoutEffect(() => {
      const index = generateTabPanelId();
      const id = `tab-panel-${index}-${providerId}`;
      const panel = { id, index } as IPanel;

      setPanel(panel);
      setPanels((previousPanels) => [...previousPanels, panel]);

      return () =>
        setPanels((previousPanels) =>
          previousPanels.filter(({ id }) => id !== panel.id)
        );
    }, [providerId]);

    const isPanelActive = selectedTabIndex === panel.index;

    return (
      <Component
        {...rest}
        id={panel.id}
        role="tabpanel"
        ref={forwardedRef}
        data-cui-tab-panel
        hidden={!isPanelActive}
        tabIndex={isPanelActive ? 0 : -1}
        aria-labelledby={tabs[panel.index]?.id}
      >
        {children}
      </Component>
    );
  }
);

/** Types, Enums and Interfaces */

export interface ITabsChildrenProps {
  focusedTabIndex: number;
  selectedTabIndex: number;
}

export interface ITabsProps {
  disabled?: boolean;
  defaultIndex?: number;
  orientation?: TabsOrientation;
  activationType?: TabsActivation;
  onChange?: (index: number) => void;
  children: ((props: ITabsChildrenProps) => React.ReactNode) | React.ReactNode;
}

export interface ITabsProviderProps {
  focusedTabIndex: number;
  selectedTabIndex: number;
  orientation?: TabsOrientation;
  activationType?: TabsActivation;
  onChange?: (index: number) => void;
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
