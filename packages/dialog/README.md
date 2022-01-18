# @ciceksepeti/cui-dialog

[![npm version](https://img.shields.io/npm/v/@ciceksepeti/cui-dialog.svg?style=flat)](https://www.npmjs.com/package/@ciceksepeti/cui-dialog) ![storybook](https://shields.io/badge/storybook-white?logo=storybook&style=flat) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ciceksepetitech/cactus-ui/blob/HEAD/LICENSE)

 Inform users about a task and can contain critical information, require decisions. A Dialog is a type of modal window that appears in front of app content to provide critical information or ask for a decision.

## Installing
Using Npm:
```bash
$ npm install @ciceksepeti/cui-dialog
```
Using Yarn:
```bash
$ yarn add @ciceksepeti/cui-dialog
```

## Example

```jsx
import React, { useState } from "react";
import Dialog from "@ciceksepeti/cui-dialog";
import '@ciceksepeti/cui-dialog/styles.css";

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
