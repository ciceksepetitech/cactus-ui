# @ciceksepeti/cui-portal

[![npm version](https://img.shields.io/npm/v/@ciceksepeti/cui-portal.svg?style=flat)](https://www.npmjs.com/package/@ciceksepeti/cui-portal) ![storybook](https://shields.io/badge/storybook-white?logo=storybook&style=flat) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ciceksepetitech/cactus-ui/blob/HEAD/LICENSE)

A first-class way to render child components into a DOM node outside of the parent DOM hierarchy defined by the component tree hierarchy.

## Installing
Using Npm:
```bash
$ npm install @ciceksepeti/cui-portal
```
Using Yarn:
```bash
$ yarn add @ciceksepeti/cui-portal
```

## Example

```jsx
import Portal from "@ciceksepeti/cui-portal";

function Demo() {
  return <Portal>I am in a portal appended to body</Portal>;
}
```
