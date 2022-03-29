import React from 'react';

import Table from '../Table/Table';
import EventTableCells from './EventTableCells';

function EventTable({ tableData }: EventTableProps) {
  const headerItems = ['Name', 'Type', 'Description'];
  return (
    <Table
      tHeaderItems={headerItems}
      tBodyItems={tableData}
      className="cui-table"
      tableCellsComponent={EventTableCells}
    />
  );
}

type EventTableProps = {
  tableData: IEventTableBody;
};

export interface IEventTableBody {
  data: IEventTableData;
}

interface IEventTableData {
  title: string;
  type: {
    name: string;
    detail?: string;
  };
  description: string;
}

export default EventTable;
