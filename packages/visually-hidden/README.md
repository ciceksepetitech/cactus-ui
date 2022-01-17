# @cs/component-visually-hidden

[![Stable release](https://img.shields.io/npm/v/@ciceksepeti/cui/visually-hidden.svg)](https://npm.im/@ciceksepeti/cui/visually-hidden) ![MIT license](https://badgen.now.sh/badge/license/MIT)

Visually Hidden is used when an element needs to be available to assistive technology, but otherwise hidden. The visually hidden component hides text visually from screen, but keeps it available to assistive technologies, such as screen readers. The component shouldn't be used to hide interactive content.

```jsx
import VisuallyHidden from "@cs/component-visually-hidden";

function Demo() {
  return <VisuallyHidden>Should not be seen!</VisuallyHidden>;
}
```
