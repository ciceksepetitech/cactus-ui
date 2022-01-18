# @ciceksepeti/cui-alert-dialog

[![npm version](https://img.shields.io/npm/v/@ciceksepeti/cui-alert-dialog.svg?style=flat)](https://www.npmjs.com/package/@ciceksepeti/cui-alert-dialog) ![storybook](https://shields.io/badge/storybook-white?logo=storybook&style=flat) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ciceksepetitech/cactus-ui/blob/HEAD/LICENSE)

Informs the user about situations that require acknowledgement.

## Installing
Using Npm:
```bash
$ npm install @ciceksepeti/cui-alert-dialog
```
Using Yarn:
```bash
$ yarn add @ciceksepeti/cui-alert-dialog
```

## Example

```jsx
import AlertDialog from "@ciceksepeti/cui-alert-dialog";
import '@ciceksepeti/cui-alert-dialog/styles.css";

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
