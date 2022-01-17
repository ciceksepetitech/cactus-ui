# @ciceksepeti/cui-visually-hidden

[![npm version](https://img.shields.io/npm/v/@ciceksepeti/cui-visually-hidden.svg?style=flat)](https://www.npmjs.com/package/@ciceksepeti/cui-visually-hidden) ![storybook](https://shields.io/badge/storybook-white?logo=storybook&style=flat) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ciceksepetitech/cactus-ui/blob/HEAD/LICENSE)

Visually Hidden is used when an element needs to be available to assistive technology, but otherwise hidden. The visually hidden component hides text visually from screen, but keeps it available to assistive technologies, such as screen readers. The component shouldn't be used to hide interactive content.

## Installing
Using Npm:
```bash
$ npm install @ciceksepeti/cui-visually-hidden
```
Using Yarn:
```bash
$ yarn add @ciceksepeti/cui-visually-hidden
```

## Example

```jsx
import VisuallyHidden from "@ciceksepeti/cui-visually-hidden";

function Demo() {
  return <VisuallyHidden>Should not be seen!</VisuallyHidden>;
}
```
