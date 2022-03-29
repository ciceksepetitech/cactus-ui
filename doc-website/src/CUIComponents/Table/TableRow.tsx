import React from 'react';

function TableRow<T>({
  data,
  className,
  tableCellsComponent: TableCellsComponent,
}: TableRowProps<T>): JSX.Element {
  if (Array.isArray(data)) {
    return (
      <tr className={className || ''}>
        {data.map((item, index) => {
          return (
            <td key={index}>
              <p>{item}</p>
            </td>
          );
        })}
      </tr>
    );
  }
  return (
    <tr className={className || ''}>
      <TableCellsComponent data={data} />
    </tr>
  );
}

type TableRowProps<T> = {
  data: string[] | T;
  className?: string;
  tableCellsComponent?: React.ComponentType<any>;
};

export default TableRow;
