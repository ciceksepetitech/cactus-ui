# @ciceksepeti/cui-focus-trap

[![npm version](https://img.shields.io/npm/v/@ciceksepeti/cui-focus-trap.svg?style=flat)](https://www.npmjs.com/package/@ciceksepeti/cui-focus-trap) ![storybook](https://shields.io/badge/storybook-white?logo=storybook&style=flat) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ciceksepetitech/cactus-ui/blob/HEAD/LICENSE)

Component that traps focus within a DOM node A focus trap ensures that tab and shift + tab keys will cycle through the focus trap's tabbable elements but not leave the focus trap. This is great for making accessible modals.

## Installing
Using Npm:
```bash
$ npm install @ciceksepeti/cui-focus-trap
```
Using Yarn:
```bash
$ yarn add @ciceksepeti/cui-focus-trap
```

## Example

```jsx
import FocusTrap from "@ciceksepeti/cui-focus-trap";

function Demo() {
  return (
    <FocusTrap>
      <div>
        <button>focusable</button>
        <button>focusable</button>
        <button>focusable</button>
        <button disabled>disabled</button>
        <button style={{ visibility: "hidden" }}>hidden</button>
        <button tabIndex={-1}>tabindex -1</button>
        <button>focusable</button>
      </div>
    </FocusTrap>
  );
}
```
