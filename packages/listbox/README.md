# @cs/component-listbox

[![Stable release](https://img.shields.io/npm/v/@ciceksepeti/cui/listbox.svg)](https://npm.im/@ciceksepeti/cui/listbox) ![MIT license](https://badgen.now.sh/badge/license/MIT)

Renders list of options in a accessible way.

```jsx
import React, { useState } from "react";
import { Listbox, ListboxItem } from "@cs/component-listbox";
import "@cs/component-listbox/styles.css";

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