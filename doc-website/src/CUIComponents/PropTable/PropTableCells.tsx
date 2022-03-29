import React from 'react';

import {
  DefaultCell,
  DescriptionCell,
  NameCell,
  RequiredCell,
  TypeCell,
} from '../Table/TableCell';
import { IPropTableBody } from './PropTable';

function PropTableCells({ data }: IPropTableBody) {
  return (
    <>
      <NameCell data={data} />
      <TypeCell data={data} />
      <DefaultCell data={data} />
      <RequiredCell data={data} />
      <DescriptionCell data={data} />
    </>
  );
}

export default PropTableCells;
