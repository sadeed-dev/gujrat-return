import React from 'react';
import DataTable from '../../../../shared/DataTable';
import TableSkeleton from '../../../../shared/TableSkelton';

const TaskTable = ({
  isLoading,
  data,
  columns,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
}) => {
  if (isLoading) {
    return <TableSkeleton columns={columns.length} rows={8} />;
  }

  return (
    <DataTable
      data={data}
      columns={columns}
      page={page}
      rowsPerPage={rowsPerPage}
      totalCount={totalCount}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      editDelteBtn={false}
    />
  );
};

export default TaskTable;
