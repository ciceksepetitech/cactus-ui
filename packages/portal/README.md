# @cs/component-portal

[![Stable release](https://img.shields.io/npm/v/@ciceksepeti/cui/portal.svg)](https://npm.im/@ciceksepeti/cui/portal) ![MIT license](https://badgen.now.sh/badge/license/MIT)

A first-class way to render child components into a DOM node outside of the parent DOM hierarchy defined by the component tree hierarchy.

```jsx
import Portal from "@cs/component-portal";

function Demo() {
  return <Portal>I am in a portal appended to body</Portal>;
}
```
