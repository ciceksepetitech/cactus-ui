import React from 'react';

import TableHead from './TableHead';
import TableRow from './TableRow';

function Table<T>({
  tHeaderItems,
  tBodyItems,
  className,
  tableCellsComponent,
}: TableProps<T>) {
  const TableCells = tableCellsComponent || null;
  return (
    <div className="table-container">
      <table className={className || ''}>
        <TableHead
          tHeaderItems={tHeaderItems}
          className={className ? `${className}--header` : ''}
        />
        <tbody className="fs-14">
          {Object.keys(tBodyItems).map((key, index) => {
            return (
              <TableRow
                key={index}
                data={tBodyItems[key]}
                className={className ? `${className}--row` : ''}
                tableCellsComponent={TableCells}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

type TableProps<T> = {
  tHeaderItems: string[];
  tBodyItems: T;
  className?: string;
  tableCellsComponent?: React.ComponentType<any>;
};
export default Table;
