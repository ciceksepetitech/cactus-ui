# @ciceksepeti/cui-popover

[![npm version](https://img.shields.io/npm/v/@ciceksepeti/cui-popover.svg?style=flat)](https://www.npmjs.com/package/@ciceksepeti/cui-popover) ![storybook](https://shields.io/badge/storybook-white?logo=storybook&style=flat) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ciceksepetitech/cactus-ui/blob/HEAD/LICENSE)

Popovers are small overlays that open on demand. They let users access additional content and actions without cluttering the page.

## Installing
Using Npm:
```bash
$ npm install @ciceksepeti/cui-popover
```
Using Yarn:
```bash
$ yarn add @ciceksepeti/cui-popover
```

## Example

```jsx
import React, { useRef, useState } from "react";
import Popover from "@ciceksepeti/cui-popover";

function Demo() {
  const targetRef = useRef();
  const [open, setOpen] = useState();

  return (
    <div>
      <button ref={targetRef} setOpen={() => setOpen(!open)}>
        Toggle Popover
      </button>
      {open && (
        <Popover targetRef={targetRef}>
          Aliqua consectetur non ut id nostrud sit ipsum consequat officia
        </Popover>
      )}
    </div>
  );
}
```
