// import React, { useMemo, useState } from 'react'
// import DataTable from '../../../shared/DataTable'
// import { useGetAssignedLFAs, useUpdateLfaStatus } from '../../../hook/use-Lfa.hook'
// import { Container, Typography, Box, TextField, Grid, Chip, IconButton, Button, Tooltip } from '@mui/material'
// import StatusActions from './StatusActions'

// import { useAuth } from '../../../context/auth/AuthContext'
// import { DeleteIcon, EditIcon } from 'lucide-react'
// import { Visibility as VisibilityIcon } from "@mui/icons-material"
// import { Outlet, useNavigate } from 'react-router-dom'
// import TaskActionButton from './TaskActionButton'
// import TableSkeleton from '../../../shared/TableSkelton'
// import useColumnVisibility from '../../../hook/use-columnVisibility.hook'
// import ColumnVisibilityToggle from '../../../shared/ColumnVisibilityToggle'
// import TaskColumns from './columns/TaskColumns'
// import { FormProvider, useForm } from 'react-hook-form'
// import LfaFilters from '../lfas/filter/LfaFilters'


// const Task = () => {
//   // Fetch all assigned LFAs (for admin)
//   const { data, isLoading } = useGetAssignedLFAs()

//   const naviagte = useNavigate()
 

//   const handleView = (row) => {

//     naviagte(`/admin/task/view/${row._id}`)
//   }


//   const {user}  = useAuth()
//   // Search/filter state
//   const [searchName, setSearchName] = useState("")
//   const [searchAssignedBy, setSearchAssignedBy] = useState("")
//   const [page, setPage] = useState(0)
//   const [rowsPerPage, setRowsPerPage] = useState(10)

//   // Define columns
// const columns = TaskColumns(handleView);


//   const {
//     visibility,
//     setValue,
//     toggleField
//   } = useColumnVisibility(columns, "taskTable");
//   const visibleColumns = columns.filter(col => visibility[col.field] !== false);


//   // Prepare and filter data
//   const filteredData = useMemo(() => {
//     if (!Array.isArray(data?.data)) return []
//     return data?.data
//       .map(item => ({
//         ...item,
//         assignedBy: item.assignment?.assignedBy?.name || "-", // admin name
//         assignedTo: item.assignment?.assignedTo?.name || "-", // lfa name
//         assignedByEmail: item.assignment?.assignedBy?.email || "",
//         assignedDate: item.assignment?.assignedAt
//           ? new Date(item.assignment.assignedAt).toLocaleDateString()
//           : "-",
//         interestedWork: Array.isArray(item.interestedWork)
//           ? item.interestedWork.join(", ")
//           : item.interestedWork || "-",
//       }))
//       .filter(item =>
//         (!searchName || item.name?.toLowerCase().includes(searchName.toLowerCase())) &&
//         (!searchAssignedBy || item.assignedBy?.toLowerCase().includes(searchAssignedBy.toLowerCase()))
//       )
//   }, [data, searchName, searchAssignedBy])
//   const methods = useForm({
//     defaultValues: {
//       search: "",
//       status: "",
//     },
//   });

//   const { getValues, setValue: setFormValue } = methods;


//   // Pagination
//   const paginatedData = useMemo(() => {
//     const start = page * rowsPerPage
//     return filteredData.slice(start, start + rowsPerPage)
//   }, [filteredData, page, rowsPerPage])
//   // ✅ Handlers
//   const handleSearchEnter = () => {
//     const filters = getValues();
//     setAppliedFilters(prev => ({
//       ...prev,
//       search: filters.search || "",
//       page: 0,
//     }));
//   };

//   const handleApplyFilters = () => {
//     const filters = getValues();
//     setAppliedFilters(prev => ({
//       ...prev,
//       search: filters.search || "",
//       status: filters.status || "",
//       page: 0,
//     }));
//   };

//   const handleClearFilters = () => {
//     setFormValue("search", "");
//     setFormValue("status", "");
//     setAppliedFilters({
//       page: 0,
//       limit: 5,
//       search: "",
//       status: "",
//     });
//   };
//   return (
//     <>
//           <div maxWidth="xl" sx={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
//         <Box mb={3}>
//           <Typography variant="h4" component="h1" fontWeight={500} sx={{ color: "#16a34a" }}>
//             All Assigned LFA Tasks
//           </Typography>
//         </Box>
//         <Box mb={2}>
//          <FormProvider {...methods}>
//       <LfaFilters
//         onSearchEnter={handleSearchEnter}
//         onApplyFilters={handleApplyFilters}
//         onClearFilters={handleClearFilters}
//         userCount={data?.length || 0}

//           columns={columns}
//     visibility={visibility}
//     setValues={setFormValue}
//     toggleField={toggleField}
//       />
//       </FormProvider>
//         </Box>

//       {
//         isLoading ? (
//   <TableSkeleton columns={columns.length} rows={8} />

//         ): (
//         <DataTable
//           data={paginatedData}
//           columns={visibleColumns}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           totalCount={filteredData.length}
//           onPageChange={setPage}
//           onRowsPerPageChange={setRowsPerPage}
//           onStatusChange={() => { }}
//           // renderActions={(row) => <StatusActions row={row} />}
//           onAssign={() => { }}
//           editDelteBtn={false}
//         />
//         )
//       }

//       </div>
//       <Outlet />
//     </>

//   )
// }

// export default Task


;import React, { useState } from 'react'; 
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import FilterListIcon from "@mui/icons-material/FilterList";

import { useForm, FormProvider } from 'react-hook-form';
import { useGetAssignedLFAs } from '../../../hook/use-Lfa.hook'; // ensure correct hook import
import useColumnVisibility from '../../../hook/use-columnVisibility.hook';
import TaskColumns from './columns/TaskColumns';
import TaskFilters from './components/TaskFilters';
import TaskTable from './components/TaskTable';
import { useNavigate, Outlet } from 'react-router-dom';

const Task = () => {
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width:600px)");
const [showFilters, setShowFilters] = useState(!isMobile);

  const methods = useForm({
    defaultValues: {
      search: "",
      status: "",
      page: 0, // zero-based frontend
      limit: 10,
    },
  });

  const { getValues, setValue } = methods;

  const [appliedFilters, setAppliedFilters] = React.useState({
    page: 0,
    limit: 10,
  });

  // 🔗 Call backend with applied filters (convert to 1-based page)
  const { data, isLoading } = useGetAssignedLFAs({
    ...appliedFilters,
    page: appliedFilters.page + 1,
    limit: appliedFilters.limit,
  });


  const handleView = (row) => {
    navigate(`/admin/task/view/${row._id}`);
  };

  const columns = TaskColumns(handleView);
  const { visibility, setValue: setValues, toggleField } = useColumnVisibility(columns, "taskTable");
  const visibleColumns = columns.filter(col => visibility[col.field] !== false);

  // 📝 Pagination handlers
  const handlePageChange = (newPage) => {
    setAppliedFilters(prev => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleRowsPerPageChange = (newLimit) => {
    setAppliedFilters(prev => ({
      ...prev,
      limit: newLimit,
      page: 0,
    }));
  };

  return (
    <>


<Box sx={{ backgroundColor: "#f9fafb", minHeight: "100vh", paddingRight: 3 }}>
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      mb: 2,
    }}
  >
    <Typography
      variant="h5" // Changed from h4 to h6 to decrease size
      fontWeight={500}
      sx={{ color: "#16a34a", fontSize: isMobile ? "18px" : "25px" }} // further control size
    >
      All Assigned Tasks
    </Typography>

    {isMobile && (
      <IconButton
        onClick={() => setShowFilters((prev) => !prev)}
        sx={{ color: "#16a34a" }}
      >
        <FilterListIcon />
      </IconButton>
    )}
  </Box>

  {(!isMobile || showFilters) && (
    <FormProvider {...methods}>
      <TaskFilters
        setAppliedFilters={setAppliedFilters}
        columns={columns}
        visibility={visibility}
        setValues={setValues}
        toggleField={toggleField}
        totalCount={data?.total || 0}
      />
    </FormProvider>
  )}

  <TaskTable
    isLoading={isLoading}
    data={data?.data || []}
    columns={visibleColumns}
    page={appliedFilters.page}
    rowsPerPage={appliedFilters.limit}
    totalCount={data?.total || 0}
    onPageChange={handlePageChange}
    onRowsPerPageChange={handleRowsPerPageChange}
  />
</Box>



      <Outlet />
    </>
  );
};

export default Task;


