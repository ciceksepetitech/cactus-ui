import { Checkbox } from '@ciceksepeti/cui-checkbox';
import React, { useState } from 'react';

type ArgProps = {
  as: React.ElementType;
  id: string;
  name: string;
  value: string;
  disabled: boolean;
  checked: boolean;
  indeterminate: boolean;
};

function CUICheckboxDefault({
  disabled = false,
  indeterminate = false,
  name = 'rose',
  value = 'rose',
  id = 'rose',
}) {
  const [checked, setChecked] = useState<boolean>(false);
  const args: ArgProps = {
    as: 'div',
    id,
    name,
    value,
    disabled,
    checked,
    indeterminate,
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox
        {...args}
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
      />
      <label style={{ marginRight: '10px' }} htmlFor={id}>
        {value}
      </label>
    </div>
  );
}

export default CUICheckboxDefault;
