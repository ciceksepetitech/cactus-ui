import React from 'react';

import { IPropTableBody } from '../PropTable/PropTable';
import { DescriptionCell, NameCell, TypeCell } from '../Table/TableCell';

function EventTableCells({ data }: IPropTableBody) {
  return (
    <>
      <NameCell data={data} />
      <TypeCell data={data} />
      <DescriptionCell data={data} />
    </>
  );
}

export default EventTableCells;
