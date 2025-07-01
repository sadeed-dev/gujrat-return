"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import DataTable from "../../shared/DataTable";
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, useMediaQuery } from "@mui/material";
import UserEditForm from "./dialog/UserEditForm";
import FilterListIcon from "@mui/icons-material/FilterList";

import {
  useGetAllUsers,
  useUpdateUser,
  useDeleteUser,
  useUpdateUserStatus,
} from "../../hook/use-user.hook";
import { useAuth } from "../../context/auth/AuthContext";
import { getUserColumns } from "./columns/UserColumns";
import TableSkeleton from "../../shared/TableSkelton";
import { useNavigate } from "react-router-dom";
import UserFilters from "./filters/UserFilters";
import ColumnVisibilityToggle from "../../shared/ColumnVisibilityToggle";
import useColumnVisibility from "../../hook/use-columnVisibility.hook";
import { Box } from "@mui/material";
const AllUsers = () => {
  const methods = useForm({
    defaultValues: {
      search: "",
      role: "",
      status: "",
    },
  });

  const { getValues, setValue } = methods;
  const [appliedFilters, setAppliedFilters] = useState({
    page: 0,
    limit: 6,
  });

  const { data, isLoading } = useGetAllUsers({
    ...appliedFilters,
    page: appliedFilters.page + 1, // backend expects 1-based page
    limit: appliedFilters.limit,
  });

  const { mutateAsync: updateUser } = useUpdateUser();
  const { mutateAsync: deleteUser } = useDeleteUser();
  const { user } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width:600px)");
const [showFilters, setShowFilters] = useState(false);
  const handleUserEditFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("state", data.state);
    formData.append("district", data.district);
    formData.append("tehsil", data.tehsil);

    if (data.aadhaarFile?.length) {
      formData.append("aadhaarFile", data.aadhaarFile[0]);
    }
    if (data.panFile?.length) {
      formData.append("panFile", data.panFile[0]);
    }

    try {
      await updateUser({ id: editRow._id, data: formData });
      setEditOpen(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleEdit = (row) => {
    setEditRow(row);
    setEditOpen(true);
  };

  const handleDelete = (row) => {
    deleteUser({ id: row._id });
  };

  const handleView = (row) => {
    navigate(`/admin/users/view/${row._id}`);
  };

  // ✅ Search filter: API call only on Enter
  const handleSearchEnter = () => {
    const filters = getValues();
    setAppliedFilters({
      ...filters,
      page: 0,
      limit: appliedFilters.limit,
    });
  };

  // ✅ Role & Status filters: API call only on Apply Filters button
  const handleApplyFilters = () => {
    const filters = getValues();
    setAppliedFilters({
      ...filters,
      page: 0,
      limit: appliedFilters.limit,
    });
  };

  // ✅ Clear All: reset form and refetch unfiltered data
  const handleClearFilters = () => {
    setValue("search", "");
    setValue("role", "");
    setValue("status", "");
    setAppliedFilters({
      page: 0,
      limit: 10,
    });
  };

  // 📝 Pagination change handlers
  const handlePageChange = (newPage) => {
    setAppliedFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleRowsPerPageChange = (newLimit) => {
    setAppliedFilters((prev) => ({
      ...prev,
      limit: newLimit,
      page: 0, // reset page when limit changes
    }));
  };

  const columns = getUserColumns({
    user,
    handleEdit,
    handleDelete,
    handleView,
    useUpdateUserStatus,
  });

  const {
    visibility,
    setValue: setValues,
    toggleField,
  } = useColumnVisibility(columns, "taskTable");
  const visibleColumns = columns.filter(
    (col) => visibility[col.field] !== false
  );
{console.log(data)}
  return (

        <Box sx={{ backgroundColor: "#f9fafb", minHeight: "100vh",paddingRight:3, }}>
        <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      mb: 2,
    }}
  >
    <Typography
      variant="h6" // Changed from h4 to h6 to decrease size
      fontWeight={500}
      sx={{ color: "#16a34a", fontSize: isMobile ? "18px" : "24px" }} // further control size
    >
      All Registered Users
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
      <UserFilters
        onSearchEnter={handleSearchEnter}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
        userCount={data?.total || 0}
        columns={columns}
        visibility={visibility}
        setValues={setValues}
        toggleField={toggleField}
      />

    </FormProvider>
        )}


      {isLoading ? (
        <TableSkeleton columns={columns.length} rows={8} />
      ) : (
        <DataTable
          data={data?.data || []}
          columns={visibleColumns}
          page={appliedFilters.page}
          rowsPerPage={appliedFilters.limit}
          totalCount={data?.total || 0}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
          editDeleteBtn={true}
        />
      )}

      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <UserEditForm
            defaultValues={editRow}
            onSubmit={handleUserEditFormSubmit}
            onClose={() => setEditOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AllUsers;
