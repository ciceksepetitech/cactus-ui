import React from 'react';
import { axe } from 'jest-axe';
import { RadioGroup, Radio } from '..';
import { render, screen, cleanup } from '../../../../utils/test-setup';

describe('radio group component tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('radio group should pass a11y', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

const Component = (props) => {
  return (
    <RadioGroup {...props} aria-label="fruits">
      <label id="apple-label" htmlFor="apple">
        <Radio
          disabled
          id="apple"
          value="apple"
          aria-labelledby="apple-label"
        />
        apple
      </label>
      <label id="cherry-label" htmlFor="cherry">
        <Radio id="cherry" value="cherry" aria-labelledby="cherry-label" />
        cherry
      </label>
      <label id="orange-label" htmlFor="orange">
        <Radio
          disabled
          id="orange"
          value="orange"
          aria-labelledby="orange-label"
        />
        orange
      </label>
      <label id="banana-label" htmlFor="banana">
        <Radio id="banana" value="banana" aria-labelledby="banana-label" />
        banana
      </label>
    </RadioGroup>
  );
};
