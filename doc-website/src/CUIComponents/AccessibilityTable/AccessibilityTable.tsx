import React from 'react';

import Table from '../Table/Table';
import AccessibilityTableCells from './AccessibilityTableCells';

function AccessibilityTable({ tableData }: AccessibilityTableProps) {
  const headerItems = ['Name', 'Type', 'Description'];
  return (
    <Table
      tHeaderItems={headerItems}
      tBodyItems={tableData}
      className="cui-table"
      tableCellsComponent={AccessibilityTableCells}
    />
  );
}

type AccessibilityTableProps = {
  tableData: IAccessibilityTableBody;
};

export interface IAccessibilityTableBody {
  data: IAccessibilityTableData;
}

interface IAccessibilityTableData {
  title: string;
  type: {
    name: string;
    detail?: string;
  };
  description: string;
}

export default AccessibilityTable;
