import React from 'react';

import { IEventTableBody } from '../EventTable/EventTable';
import { IPropTableBody } from '../PropTable/PropTable';
import { DescriptionCell, NameCell } from '../Table/TableCell';
import { IAccessibilityTableBody } from './HookTable';

export function HookTypeCell({
  data,
}: IPropTableBody | IAccessibilityTableBody | IEventTableBody) {
  const dataType = Object.keys(data.type);

  return (
    <td className="cui-table__cell" data-column="Type">
      {dataType.length === 1 ? (
        <p className="c-red700 f-code">{data.type.name}</p>
      ) : (
        dataType
          .filter((result) => result !== 'detail')
          .map((types, index) => {
            return (
              <p className="c-red700 f-code d-block" key={index}>
                {data.type[types]}
              </p>
            );
          })
      )}
    </td>
  );
}

function HookTableCells({ data }: IAccessibilityTableBody) {
  return (
    <>
      <NameCell data={data} />
      <HookTypeCell data={data} />
      <DescriptionCell data={data} />
    </>
  );
}

export default HookTableCells;
