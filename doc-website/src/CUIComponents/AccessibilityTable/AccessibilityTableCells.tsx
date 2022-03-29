import React from 'react';

import { DescriptionCell, NameCell, TypeCell } from '../Table/TableCell';
import { IAccessibilityTableBody } from './AccessibilityTable';

function AccessibilityTableCells({ data }: IAccessibilityTableBody) {
  return (
    <>
      <NameCell data={data} />
      <TypeCell data={data} />
      <DescriptionCell data={data} />
    </>
  );
}

export default AccessibilityTableCells;
