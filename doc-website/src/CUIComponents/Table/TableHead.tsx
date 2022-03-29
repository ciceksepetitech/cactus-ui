import React from 'react';

import TableRow from './TableRow';

type TableHeadProps = {
  tHeaderItems: string[],
  className?: string,
};

function TableHead({ tHeaderItems, className }: TableHeadProps) {
  return (
    <thead className={className || ''}>
      <TableRow
        data={tHeaderItems}
        className={className ? `fw-600 fs-12 ${className}-row` : ''}
      />
    </thead>
  );
}

export default TableHead;
