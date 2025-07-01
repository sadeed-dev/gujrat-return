import React from 'react';
import { Box } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import LfaFilters from '../../lfas/filter/LfaFilters';

const TaskFilters = ({
  setAppliedFilters,
  columns,
  visibility,
  setValues,
  toggleField,
  totalCount,
  defaultLimit = 10,
}) => {
  const { getValues, setValue } = useFormContext();

  const handleSearchEnter = () => {
    const filters = getValues();
    setAppliedFilters({
      ...filters,
      page: 0,
      limit: defaultLimit,
    });
  };

  const handleApplyFilters = () => {
    const filters = getValues();

    console.log(filters)
    setAppliedFilters({
      ...filters,
      page: 0,
      limit: defaultLimit,
    });
  };

  const handleClearFilters = () => {
    setValue("search", "");
    setValue("status", "");
        setValue("taskStatus", "");

    setAppliedFilters({
      search: "",
      status: "",
      page: 0,
      limit: defaultLimit,
    });
  };

  return (
    <Box mb={2}>
      <LfaFilters
        onSearchEnter={handleSearchEnter}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
        userCount={totalCount}
        columns={columns}
        visibility={visibility}
        setValues={setValues}
        toggleField={toggleField}
        isFilterVisible={true}
      />
    </Box>
  );
};

export default TaskFilters;
