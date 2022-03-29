---
sidebar_position: 2
---

import AdmonitionContainer from '/src/CUIComponents/Containers/AdmonitionContainer/AdmonitionContainer.tsx'
import {
Accordion,
AccordionItem,
} from '/src/CUIComponents/Containers/AccordionItem/AccordionItem.tsx';

# Styling

As CsTech, our main aim is accessibility for Cactus UI when we created the library. Therefore, each component comes with **minimum styling** that allows the component usable easily and as it's supposed to be. For a dev-friendly development experience, the styling of any Cactus UI component is kept simple and flexible as much as possible. You can style components the way using CSS, sass or styled-components etc.

We always will try to keep minimum default styling and as flexible as possible for all components.

## Importing Built-in Style

> Some of Cactus UI components have built-in styling to display correctly and work properly. Styling should be imported like below:

```jsx
import { <ComponentName> } from '@ciceksepeti/cui-<componentName>';
import '@ciceksepeti/cui-<componentName>/styles.css';
```

<AdmonitionContainer type='info'>
Every component page has examples about using the component and the examples show clearly which component needs its own built-in style importing.
</AdmonitionContainer>

> Also, CSS bundle importing can be used to access all styling with one import.

```jsx
import '@ciceksepeti/cui/styles.css';
```

## Overriding & Adding New Styles

You can style any component of Cactus UI like any other element in your app. Also, Cactus UI provides **data attributes** for each component and its subcomponent, to allow you can easily reach and style components.

<Accordion className="accordion" defaultIndexes={[0]} single={false}>

### Using Data Attributes {#Using-Data-Attributes}

<AccordionItem title='Using-Data-Attributes' expanded={true} style={{height:'1500px'}}>

> Each component has a `data-cui-<componentName>` attribute to you can apply style easier.

```css
[data-cui-listbox-button] {
  color: black;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 4px;
  align-items: center;
  display: inline-flex;
  background-color: white;
  border: 1px solid #eee;
  justify-content: space-between;
}

[data-cui-listbox-list] {
  margin: 0;
  padding: 0;
  list-style: none;
}
```

> To apply your style depending on the state of the component, Cactus UI provide pseudo attributes.

```css
[data-cui-listbox-button][aria-disabled='true'] {
  opacity: 0.5;
}
[data-cui-listbox-arrow][data-expanded='false']::before {
  content: '\276F';
}
```

<AdmonitionContainer type='info'>
Some components like <span className='fw-600'>Listbox </span> has more than a data attribute cause it has subcomponents.
You can find all data attributes of the component on the styling part of the component's page.
</AdmonitionContainer>
</AccordionItem >

### Using Styled Component {#Using-Styled-Component}

<AccordionItem title='Using-Styled-Component'>

```jsx
import { Checkbox } from '@ciceksepeti/cui-checkbox';
import '@ciceksepeti/cui-checkbox/styles.css';
import styled from 'styled-components';

const StyledCheckbox = styled(Checkbox)`
  font-size: 24px;
  text-align: center;
  color: palevioletred;
  border: 1px solid red;
`;
```

</AccordionItem >

### Inline CSS {#Inline-CSS}

<AccordionItem title='Inline-CSS'>

```jsx
import { Alert } from '@ciceksepeti/cui-alert';

const Example = () => {
  return (
    <Alert style={{ color: 'green', fontSize: '12px' }}>I am an alert</Alert>
  );
};
```

</AccordionItem >

### CSS Classname {#CSS-Classname}

<AccordionItem title='CSS-Classname'>

```jsx
import { Alert } from '@ciceksepeti/cui-alert';

const Example = () => {
  return <Alert className="alert">I am an alert</Alert>;
};
```

</AccordionItem >
</Accordion>
