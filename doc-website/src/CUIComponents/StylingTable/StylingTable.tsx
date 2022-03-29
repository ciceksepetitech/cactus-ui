import React from 'react';

import Table from '../Table/Table';
import StylingTableCells from './StylingTableCells';

function StylingTable({ tableData }: StylingTableProps) {
  const headerItems = ['Name', 'Type'];
  return (
    <Table
      tHeaderItems={headerItems}
      tBodyItems={tableData}
      className="cui-table"
      tableCellsComponent={StylingTableCells}
    />
  );
}

type StylingTableProps = {
  tableData: IStylingTableBody,
};

export interface IStylingTableBody {
  data: IStylingTableData;
}

interface IStylingTableData {
  title: string;
  type: {
    name: string,
    detail?: string,
  };
  description: string;
}

export default StylingTable;
