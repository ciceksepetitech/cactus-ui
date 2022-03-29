import { Radio, RadioGroup } from '@ciceksepeti/cui-radio-group';
import React from 'react';

import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';

function CUIRadioGroupDefault() {
  return (
    <PreviewContainer title="Radio Group Default">
      <RadioGroup
        as="div"
        name="fruits"
        orientation="horizontal"
        aria-label="fruits"
      >
        <label htmlFor="apple" id="apple-label">
          <Radio
            disabled
            id="apple"
            value="apple"
            aria-labelledby="apple-label"
          />
          apple
        </label>
        <label htmlFor="cherry" id="cherry-label">
          <Radio id="cherry" value="cherry" aria-labelledby="cherry-label" />
          cherry
        </label>
        <label htmlFor="orange" id="orange-label">
          <Radio
            disabled
            id="orange"
            value="orange"
            aria-labelledby="orange-label"
          />
          orange
        </label>
        <label htmlFor="banana" id="banana-label">
          <Radio id="banana" value="banana" aria-labelledby="banana-label" />
          banana
        </label>
        <label htmlFor="mango" id="mango-label">
          <Radio id="mango" value="mango" aria-labelledby="mango-label" />
          mango
        </label>
      </RadioGroup>
    </PreviewContainer>
  );
}

export default CUIRadioGroupDefault;
