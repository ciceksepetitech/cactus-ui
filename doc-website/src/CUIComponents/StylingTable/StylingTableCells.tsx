import React from 'react';

import { NameCell, TypeCell } from '../Table/TableCell';
import { IStylingTableBody } from './StylingTable';

function StylingTableCells({ data }: IStylingTableBody) {
  return (
    <>
      <NameCell data={data} />
      <TypeCell data={data} />
    </>
  );
}

export default StylingTableCells;
