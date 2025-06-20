import React, { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import DataTable from "../../shared/DataTable";
import { Dialog, DialogContent, DialogTitle, Snackbar, Alert, Chip } from "@mui/material";
import UserEditForm from "./UserEditForm";
import { useGetAllUsers, useUpdateUser, useDeleteUser, useUpdateUserStatus } from '../../hook/use-user.hook';
import { useAuth } from "../../context/auth/AuthContext";
import StatusActions from "../admin/task/StatusActions";

const AllUsers = () => {
  const { data, isLoading } = useGetAllUsers();
  // const {data: updateUser} = useUpdateUser();

  const { mutate: updateUser, isLoading: isUpdating } = useUpdateUser();

  const { mutate: deleteUser } = useDeleteUser();
  const { mutate } = useUpdateUserStatus();


  const { user } = useAuth()
  const [editOpen, setEditOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleEdit = (row) => {
    setEditRow(row);
    setEditOpen(true);
  };

  const handleDelete = (row) => {
    try {
      deleteUser({ id: row._id });
      setSnackbar({ open: true, message: "User deleted successfully", severity: "success" });
    } catch (err) {
      setSnackbar({ open: true, message: "Failed to delete user", severity: "error" });
    }
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


  const columns = [
    { field: "serial", headerName: "S.No.", type: "serial", minWidth: 40, align: "center" },
    { field: "name", headerName: "Full Name", minWidth: 150, align: "center" },
    { field: "email", headerName: "Email", minWidth: 180, align: "center" },
    {
      field: "role", headerName: "Role", minWidth: 100, align: "center",
      renderCell: (params) =>
        params.row?.role && (
          <Chip
            label={params.row?.role}
            size="small"
            sx={{
              backgroundColor:
                params.row?.role === "ADMIN"
                  ? "oklch(75% 0.25 30)" // red for admin
                  : "oklch(75% 0.145 163.225)", // green for user
              color: "#fff",
              fontWeight: "bold",
            }}
          />

        ),
    },


    { field: "state", headerName: "State", minWidth: 120, align: "center" },
    { field: "district", headerName: "District", minWidth: 120, align: "center" },
    { field: "tehsil", headerName: "Tehsil", minWidth: 120, align: "center" },
    ...(user?.role === "ADMIN"
      ? [
        {
          field: "isApproved",
          headerName: "Approved",
          minWidth: 120,
          align: "center",
          renderCell: ({ row }) => (

            <StatusActions
              row={{
                ...row,
                status: row.status || 'pending', // or use isApproved if needed
              }}
              useUpdateHook={useUpdateUserStatus} // or any other hook you use
              dialogText={{
                approveTitle: "Approve User",
                approveContent: "Are you sure to approve this user?",
                rejectTitle: "Reject User",
                rejectContent: "Are you sure to reject this user?",
              }}
            />
          )
        }

      ]
      : []),



  ];


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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </AdminLayout>
  );
};

export default AllUsers;