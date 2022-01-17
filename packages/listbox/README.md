# @ciceksepeti/cui-listbox

[![npm version](https://img.shields.io/npm/v/@ciceksepeti/cui-listbox.svg?style=flat)](https://www.npmjs.com/package/@ciceksepeti/cui-listbox) ![storybook](https://shields.io/badge/storybook-white?logo=storybook&style=flat) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ciceksepetitech/cactus-ui/blob/HEAD/LICENSE)

Renders list of options in a accessible way.

## Installing
Using Npm:
```bash
$ npm install @ciceksepeti/cui-listbox
```
Using Yarn:
```bash
$ yarn add @ciceksepeti/cui-listbox
```

## Example

```jsx
import React, { useState } from "react";
import { Listbox, ListboxItem } from "@ciceksepeti/cui-listbox";
import "@ciceksepeti/cui-listbox/styles.css";

function Demo(props) {
  let [value, setValue] = useState("apple");
  return (
    <Listbox value={value} onChange={(value) => setValue(value)}>
        <ListboxItem value="apple">apple</ListboxItem>
        <ListboxItem value="orange">orange</ListboxItem>
        <ListboxItem value="cherry">cherry</ListboxItem>
        <ListboxItem value="banana">banana</ListboxItem>
    </Listbox>
  );
}
```