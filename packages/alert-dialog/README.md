# @cs/component-alert-dialog

[![Stable release](https://img.shields.io/npm/v/@ciceksepeti/cui/alert-dialog.svg)](https://npm.im/@ciceksepeti/cui/alert-dialog) ![MIT license](https://badgen.now.sh/badge/license/MIT)

Informs the user about situations that require acknowledgement.

```jsx
import AlertDialog from "@cs/component-alert-dialog";

function Demo() {
  return (
    <AlertDialog aria-label="alert-dialog" aria-describedby="alert-desc">
      <p id="alert-desc">
        Lorem incididunt ipsum in nostrud. Nisi commodo aliqua magna
        exercitation exercitation dolore minim commodo adipisicing veniam
        eiusmod ut aute ad. Consectetur consectetur enim nostrud duis laboris ex
        fugiat consequat veniam excepteur quis. Aute veniam voluptate deserunt
        commodo aliquip amet enim cillum magna proident.
      </p>
      <button>Confirm</button>
    </AlertDialog>
  );
}

```
