# @cs/component-focus-trap

[![Stable release](https://img.shields.io/npm/v/@ciceksepeti/cui/focus-trap.svg)](https://npm.im/@ciceksepeti/cui/focus-trap) ![MIT license](https://badgen.now.sh/badge/license/MIT)

Component that traps focus within a DOM node A focus trap ensures that tab and shift + tab keys will cycle through the focus trap's tabbable elements but not leave the focus trap. This is great for making accessible modals.

```jsx
import FocusTrap from "@cs/component-focus-trap";

function Demo() {
  return (
    <FocusTrap>
      <div>
        <button>focusable</button>
        <button>focusable</button>
        <button>focusable</button>
        <button disabled>disabled</button>
        <button style={{ visibility: "hidden" }}>hidden</button>
        <button tabIndex={-1}>tabindex -1</button>
        <button>focusable</button>
      </div>
    </FocusTrap>
  );
}
```
