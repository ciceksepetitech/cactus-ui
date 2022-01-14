# @cs/component-dialog

[![Stable release](https://img.shields.io/npm/v/@ciceksepeti/cui/dialog.svg)](https://npm.im/@ciceksepeti/cui/dialog) ![MIT license](https://badgen.now.sh/badge/license/MIT)

 Inform users about a task and can contain critical information, require decisions. A Dialog is a type of modal window that appears in front of app content to provide critical information or ask for a decision.

```jsx
import React, { useState } from "react";
import Dialog from "@cs/component-dialog";

function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open}>
      <p>I am a dialog content</p>
      <button onClick={() => setOpen(false)}>Close</button>
    </Dialog>
  );
}
```
