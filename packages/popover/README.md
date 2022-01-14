# @cs/component-popover

[![Stable release](https://img.shields.io/npm/v/@ciceksepeti/cui/popover.svg)](https://npm.im/@ciceksepeti/cui/popover) ![MIT license](https://badgen.now.sh/badge/license/MIT)

Popovers are small overlays that open on demand. They let users access additional content and actions without cluttering the page.

```jsx
import React, { useRef, useState } from "react";
import Popover from "@cs/component-popover";

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
