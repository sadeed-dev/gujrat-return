"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import DataTable from "../../shared/DataTable";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import UserEditForm from "./dialog/UserEditForm";
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
import UserFilters from "./filters/UserFilter"; // Adjust path as per your structure

const AllUsers = () => {
  const methods = useForm({
    defaultValues: {
      search: "",
      role: "",
      status: "",
    },
  });

  const { getValues, setValue } = methods;

  const [appliedFilters, setAppliedFilters] = useState({});

  const { data, isLoading } = useGetAllUsers(appliedFilters);

  const { mutateAsync: updateUser } = useUpdateUser();
  const { mutateAsync: deleteUser } = useDeleteUser();
  const { user } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const navigate = useNavigate();

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
    setAppliedFilters(filters);
  };

  // ✅ Role & Status filters: API call only on Apply Filters button
  const handleApplyFilters = () => {
    const filters = getValues();
    setAppliedFilters(filters);
  };

  // ✅ Clear All: reset form and refetch unfiltered data
  const handleClearFilters = () => {
    setValue("search", "");
    setValue("role", "");
    setValue("status", "");
    setAppliedFilters({});
  };

  const columns = getUserColumns({
    user,
    handleEdit,
    handleDelete,
    handleView,
    useUpdateUserStatus,
  });

  return (
    <FormProvider {...methods}>
      <UserFilters
        onSearchEnter={handleSearchEnter}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
        userCount={data?.data?.length || 0}
      />

      {isLoading ? (
        <TableSkeleton columns={columns.length} rows={8} />
      ) : (
        <DataTable
          data={data?.data || []}
          columns={columns}
          page={0}
          rowsPerPage={100}
          totalCount={data?.length || 0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
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
    </FormProvider>
  );
};

export default AllUsers;
