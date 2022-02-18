# @ciceksepeti/cui-radio-group

[![npm version](https://img.shields.io/npm/v/@ciceksepeti/cui-radio-group.svg?style=flat)](https://www.npmjs.com/package/@ciceksepeti/cui-radio-group) ![storybook](https://shields.io/badge/storybook-white?logo=storybook&style=flat) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ciceksepetitech/cactus-ui/blob/HEAD/LICENSE)

Radio buttons allow the user to select one option from a set. Once a radio
group is established, selecting any radio button in that group automatically
deselects any currently-selected radio button in the same group.

## Installing
Using Npm:
```bash
$ npm install @ciceksepeti/cui-radio-group
```
Using Yarn:
```bash
$ yarn add @ciceksepeti/cui-radio-group
```

## Example

```jsx
import { RadioGroup, Radio } from "@ciceksepeti/cui-radio-group";

function Demo() {
  const style = { display: 'flex', alignItems: 'center', marginRight: '10px' };

  return (
    <RadioGroup aria-label="fruits">
      <label htmlFor="apple" id="apple-label" style={style}>
        <Radio
          disabled
          id="apple"
          value="apple"
          aria-labelledby="apple-label"
        />
        apple
      </label>
      <label htmlFor="cherry" id="cherry-label" style={style}>
        <Radio id="cherry" value="cherry" aria-labelledby="cherry-label" />
        cherry
      </label>
      <label htmlFor="orange" id="orange-label" style={style}>
        <Radio
          disabled
          id="orange"
          value="orange"
          aria-labelledby="orange-label"
        />
        orange
      </label>
      <label htmlFor="banana" id="banana-label" style={style}>
        <Radio id="banana" value="banana" aria-labelledby="banana-label" />
        banana
      </label>
    </RadioGroup>
  );
}
```
