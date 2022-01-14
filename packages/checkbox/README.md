# @cs/component-checkbox

[![Stable release](https://img.shields.io/npm/v/@ciceksepeti/cui/checkbox.svg)](https://npm.im/@ciceksepeti/cui/checkbox) ![MIT license](https://badgen.now.sh/badge/license/MIT)

Tri-state checkbox component, checked, unchecked, partially checked.

```jsx
import React, { useState } from "react";
import Checkbox from "@cs/component-checkbox";

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
