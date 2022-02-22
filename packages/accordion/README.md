# @ciceksepeti/cui-skip-nav

[![npm version](https://img.shields.io/npm/v/@ciceksepeti/cui-skip-nav.svg?style=flat)](https://www.npmjs.com/package/@ciceksepeti/cui-skip-nav) ![storybook](https://shields.io/badge/storybook-white?logo=storybook&style=flat) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ciceksepetitech/cactus-ui/blob/HEAD/LICENSE)

A "skip navigation" link is a technique for facilitating similarly efficient access for users with certain disabilities. Skips until to targetId.

## Installing
Using Npm:
```bash
$ npm install @ciceksepeti/cui-skip-nav
```
Using Yarn:
```bash
$ yarn add @ciceksepeti/cui-skip-nav
```

## Example

```jsx
import SkipNav from "@ciceksepeti/cui-skip-nav";
import '@ciceksepeti/cui-skip-nav/styles.css";

function Demo() {
  return <SkipNav targetId="target-id">Skip Navigation</SkipNav>;
}
```
