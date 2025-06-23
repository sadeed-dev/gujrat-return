import React, { useState } from "react";
import AdminLayout from "../../components/AdminNavbar";
import DataTable from "../../shared/DataTable";
import { Dialog, DialogContent, DialogTitle, } from "@mui/material";
import UserEditForm from "./UserEditForm";
import { useGetAllUsers, useUpdateUser, useDeleteUser, useUpdateUserStatus } from '../../hook/use-user.hook';
import { useAuth } from "../../context/auth/AuthContext";
import { getUserColumns } from "./columns/UserColumns";

const AllUsers = () => {
  const { data, isLoading } = useGetAllUsers();
  // const {data: updateUser} = useUpdateUser();

  const { mutateAsync: updateUser, isLoading: isUpdating } = useUpdateUser();

  const { mutateAsync: deleteUser } = useDeleteUser();


  const { user } = useAuth()
  const [editOpen, setEditOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);

  const handleEdit = (row) => {
    setEditRow(row);
    setEditOpen(true);
  };

  const handleDelete = (row) => {
      deleteUser({ id: row._id });
  
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      if (data.aadhaarFile?.length) {
        formData.append("aadhaarFile", data.aadhaarFile[0]);
      }
      if (data.panFile?.length) {
        formData.append("panFile", data.panFile[0]);
      }

      formData.append("name", data.name);
      formData.append("mobileNumber", data.mobileNumber);
      formData.append("bankDetail", data.bankDetail);
      formData.append("state", data.state);
      formData.append("district", data.district);
      formData.append("tehsil", data.tehsil);

      if (Array.isArray(data.interestedWork)) {
        data.interestedWork.forEach(work => formData.append("interestedWork", work));
      } else if (data.interestedWork) {
        formData.append("interestedWork", data.interestedWork);
      }

      let res;
      if (isEditForm && defaultValues._id) {
        // Update API
        res = await axios.patch(`${BASE_URL}/lfa/update/${defaultValues._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${user?.token}`,
          },
        });

        toast.success(res.data.message || "Application updated");
        queryClient.invalidateQueries({ queryKey: ['all-LFAs'] }); // <-- move before onClose
        onClose && onClose();


      } else {
        // Create API
        res = await axios.post(`${BASE_URL}/lfa/submit`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${user?.token}`,
          },
        });
        toast.success(res.data.message || "Application submitted");
      }

      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message);
    }
  };


  const handleEditSubmit = async (data) => {
    const formData = new FormData();

    // Append files if selected
    if (data.aadhaarFile?.length) {
      formData.append("aadhaarFile", data.aadhaarFile[0]);
    }
    if (data.panFile?.length) {
      formData.append("panFile", data.panFile[0]);
    }

    // Append other fields
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("state", data.state);
    formData.append("district", data.district);
    formData.append("tehsil", data.tehsil);

    try {
      await updateUser({ id: editRow._id, data: formData }); // Ensure this accepts FormData
      setEditOpen(false);
    } catch (err) {
      console.error("Update failed:", err);
      setSnackbar({ open: true, message: "Failed to update user", severity: "error" });
    }
  };


  const columns = getUserColumns({
    user,
    handleEdit,
    handleDelete,
    useUpdateUserStatus
  });

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">All Registered Users</h2>
      <DataTable
        data={data?.data || []}
        columns={columns}
        page={0}
        rowsPerPage={100}
        totalCount={data?.length || 0}
        onPageChange={() => { }}
        onRowsPerPageChange={() => { }}
        onEdit={handleEdit}
        onDelete={handleDelete}
        editDeleteBtn={true}
      />

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <UserEditForm
            defaultValues={editRow}
            onSubmit={handleEditSubmit}
            onClose={() => setEditOpen(false)}
          />
        </DialogContent>
      </Dialog>

    </AdminLayout>
  );
};

export default AllUsers;