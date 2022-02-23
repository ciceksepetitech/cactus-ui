# @ciceksepeti/cui-accordion

[![npm version](https://img.shields.io/npm/v/@ciceksepeti/cui-accordion.svg?style=flat)](https://www.npmjs.com/package/@ciceksepeti/cui-accordion) ![storybook](https://shields.io/badge/storybook-white?logo=storybook&style=flat) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ciceksepetitech/cactus-ui/blob/HEAD/LICENSE)

An accordion is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content. The headings function as controls that enable users to reveal or hide their associated sections of content. Accordions are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page. [See w3](https://www.w3.org/TR/wai-aria-practices-1.2/#accordion)

## Installing
Using Npm:
```bash
$ npm install @ciceksepeti/cui-accordion
```
Using Yarn:
```bash
$ yarn add @ciceksepeti/cui-accordion
```

## Example

```jsx
import {
  Accordion,
  AccordionHeader,
  AccordionButton,
  AccordionContent,
} from "@ciceksepeti/cui-accordion";

function Demo() {
  return (
    <Accordion>
      <AccordionHeader>
        <AccordionButton>Step 1</AccordionButton>
      </AccordionHeader>
      <AccordionContent>
        Step 1: Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </AccordionContent>
      <AccordionHeader>
        <AccordionButton disabled>Step 2</AccordionButton>
      </AccordionHeader>
      <AccordionContent>
        Step 2: Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </AccordionContent>
      <AccordionHeader>
        <AccordionButton>Step 3</AccordionButton>
      </AccordionHeader>
      <AccordionContent>
        Step 3: Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </AccordionContent>
    </Accordion>
  );
}
```
