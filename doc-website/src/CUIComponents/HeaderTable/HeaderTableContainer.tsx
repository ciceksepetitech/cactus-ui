import React from 'react';

import HeaderTable from './HeaderTable';
import HeaderTableCards from './HeaderTableCards';
import HeaderTableDescription from './HeaderTableDescription';
import { HTableContainerProps } from './interfaces';

function HeaderTableContainer({ data }: HTableContainerProps) {
  return (
    <div>
      <HeaderTableDescription data={data} />
      <HeaderTable data={data} />
      <HeaderTableCards data={data} />
    </div>
  );
}

export default HeaderTableContainer;
