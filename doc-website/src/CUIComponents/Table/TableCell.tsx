import React from 'react';

import { IAccessibilityTableBody } from '../AccessibilityTable/AccessibilityTable';
import { IEventTableBody } from '../EventTable/EventTable';
import { IPropTableBody } from '../PropTable/PropTable';
import InfoPopover from './InfoPopover';

export function NameCell({
  data,
}: IPropTableBody | IAccessibilityTableBody | IEventTableBody) {
  return (
    <td className="cui-table__cell" data-column="Name">
      <p className="c-indigo700 b-none f-code">{data.title}</p>
    </td>
  );
}

export function TypeCell({
  data,
}: IPropTableBody | IAccessibilityTableBody | IEventTableBody) {
  return (
    <td className="cui-table__cell" data-column="Type">
      <p className="c-red700 f-code d-inline-block">{data.type.name}</p>
      {data.type.detail && (
        <InfoPopover>
          <span className="popover__context">{data.type.detail}</span>
        </InfoPopover>
      )}
    </td>
  );
}
export function DefaultCell({ data }: IPropTableBody) {
  return (
    <td className="cui-table__cell" data-column="Default">
      <p className=" f-code ">{data.defaultValue}</p>
    </td>
  );
}
export function RequiredCell({ data }: IPropTableBody) {
  return (
    <td className="cui-table__cell w-15" data-column="Required">
      <div>
        {data.required ? (
          <p className="text-center">required</p>
        ) : (
          <p className="text-center">-</p>
        )}
      </div>
    </td>
  );
}

export function DescriptionCell({
  data,
}: IPropTableBody | IAccessibilityTableBody | IEventTableBody) {
  return (
    <td className="cui-table__cell w-35" data-column="Description">
      <div className="cell--description">{data.description}</div>
    </td>
  );
}
