# @ciceksepeti/cui-alert

[![npm version](https://img.shields.io/npm/v/@ciceksepeti/cui-alert.svg?style=flat)](https://www.npmjs.com/package/@ciceksepeti/cui-alert) ![storybook](https://shields.io/badge/storybook-white?logo=storybook&style=flat) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ciceksepetitech/cactus-ui/blob/HEAD/LICENSE)

Shows alerts with accessibility support, live-regions.

## Installing
Using Npm:
```bash
$ npm install @ciceksepeti/cui-alert
```
Using Yarn:
```bash
$ yarn add @ciceksepeti/cui-alert
```

## Example

```jsx
import Alert from "@ciceksepeti/cui-alert";

function Demo(props) {
  return <Alert>I am an alert</Alert>;
}
```

```jsx
import Alert from "@ciceksepeti/cui-alert";

function Demo(props) {
  return <Alert type="assertive">I am an assertive alert</Alert>;
}
```