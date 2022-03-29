import React from 'react';

import Table from '../Table/Table';
import PropTableCells from './PropTableCells';

function PropTable({ tableData }: PropTableProps) {
  const headerItems = ['Name', 'Type', 'Default', 'Required', 'Description'];
  return (
    <Table
      tHeaderItems={headerItems}
      tBodyItems={tableData}
      className="cui-table"
      tableCellsComponent={PropTableCells}
    />
  );
}

type PropTableProps = {
  tableData: IPropTableBody,
};

export interface IPropTableBody {
  data: IPropTableData;
}

interface IPropTableData {
  title: string;
  type: {
    name: string,
    detail?: string,
  };
  defaultValue: string;
  description: string;
  required: boolean;
}

export default PropTable;
