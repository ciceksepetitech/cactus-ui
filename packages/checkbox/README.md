# @ciceksepeti/cui-checkbox

[![npm version](https://img.shields.io/npm/v/@ciceksepeti/cui-checkbox.svg?style=flat)](https://www.npmjs.com/package/@ciceksepeti/cui-checkbox) ![storybook](https://shields.io/badge/storybook-white?logo=storybook&style=flat) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ciceksepetitech/cactus-ui/blob/HEAD/LICENSE)

Tri-state checkbox component, checked, unchecked, partially checked.

## Installing
Using Npm:
```bash
$ npm install @ciceksepeti/cui-checkbox
```
Using Yarn:
```bash
$ yarn add @ciceksepeti/cui-checkbox
```

## Example

```jsx
import React, { useState } from "react";
import Checkbox from "@ciceksepeti/cui-checkbox";

function Demo(props) {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
}
```
