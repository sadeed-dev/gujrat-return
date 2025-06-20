"use client"

import { useState, useMemo, useEffect } from "react"
import {
  Box,
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  IconButton,
} from "@mui/material"
import LfaApplicationForm from '../../form/LfaApplicationForm'
import { Search as SearchIcon, FilterList as FilterIcon } from "@mui/icons-material"
import TableDisplay from "../../../shared/DataTable"
import React from 'react'
import AdminLayout from "../../../components/AdminLayout"
import AssignDialog from "./dialog-box/AssignDialog"
import { useGetAllLFAs, useAssignTo } from "../../../hook/use-Lfa.hook"
import { useGetAllUsers } from "../../../hook/use-user.hook"
import { useAuth } from "../../../context/auth/AuthContext"
import { useLocation, useNavigate } from "react-router-dom"
import { EditIcon, SendIcon } from "lucide-react"
import SendOfferDialog from "./offfer-lfa/SendOfferDialog"
import ChatRoomsPage from "./offfer-lfa/ChatRoomsPage"
import axios from "axios"
import { useCreateChatRoom, useGetAllRooms, useReactivateChatroom } from "../../../hook/use-lfachat.hook"

import ConfirmDialog from "./dialog-box/ConfirmDialog"
import DeleteIcon from '@mui/icons-material/Delete';

import { Visibility as VisibilityIcon } from "@mui/icons-material"

const MainPage = () => {

  const { data, isLoading, isError, error, refetch } = useGetAllLFAs();
  const [localData, setLocalData] = useState([]);
  const { data: usersList } = useGetAllUsers();

  const { mutate: createChatRoom } = useCreateChatRoom();

  const { user } = useAuth()
  const isAdmin = user?.role == "ADMIN"


  const [discloseDialog, setDiscloseDialog] = useState({ open: false, row: null });

  const { data: allChatRooms } = useGetAllRooms()

  const nonDeletedChatRoom = allChatRooms?.filter(room => !room.isDeleted) || [];

  // const lfaIdsWithChatRoom = new Set((allChatRooms || []).map(room => room.lfaId));

  // isLfaOfferd = allChatRooms





  useEffect(() => {
    if (data && Array.isArray(data)) {
      // Map through the data and add assignedUserName for each LFA
      const dataWithUserNames = data.map(lfa => {
        if (lfa.assignment?.assignedTo) {
          return {
            ...lfa,
            interestedWork: Array.isArray(lfa.interestedWork)
              ? lfa.interestedWork.join(", ")
              : lfa.interestedWork || "-",
            assignedUserName: lfa?.assignment?.assignedTo?.name
          };
        }
        return lfa;
      });
      setLocalData(dataWithUserNames);
    }
  }, [data, usersList]);

  // State management
  const [searchName, setSearchName] = useState("")
  const [searchLfaId, setSearchLfaId] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [statusChangeDialog, setStatusChangeDialog] = useState({
    open: false,
    row: null,
    newStatus: "",
    oldStatus: "",
  })
  const [editOpen, setEditOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const [assignDialog, setAssignDialog] = useState({ open: false, row: null });
  const [selectedUser, setSelectedUser] = useState(null);

  const [sendOfferDialog, setSendOfferDialog] = useState({ open: false, row: null })
  const [chatRooms, setChatRooms] = useState([])
  const [activeView, setActiveView] = useState("table") // "table" or "chat"

  const [deletedChatRooms, setDeletedChatRooms] = useState([])

  const [formDialog, setFormDialog] = useState({ open: false, mode: "edit", row: null });

  useEffect(() => {
    axios.get("http://localhost:5000/api/chat/all-rooms", {
      headers: { Authorization: `Bearer ${user?.token}` }
    })
      .then(res => setChatRooms(res.data))
      .catch(err => console.error("Failed to fetch chat rooms", err));

  }, [user?.token]);


  useEffect(() => {
    axios.get("http://localhost:5000/api/chat/get-deleted-rooms", {
      headers: { Authorization: `Bearer ${user?.token}` }
    })
      .then(res => setDeletedChatRooms(res.data))
      .catch(err => console.error("Failed to fetch chat rooms", err));

  }, [user?.token]);

  const location = useLocation();

  // Set activeView based on navigation state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("tab") === "chat") {
      setActiveView("chat");
    }
  }, [location.search]);
  const { mutate, isPending } = useAssignTo(assignDialog?.row?._id); // pass lfa id here

  const { mutate: reactivateChatRoom } = useReactivateChatroom()

  const handleDisclose = (row) => {
    setDiscloseDialog({ open: true, row: row }); // Save the row for later use
  }

  const handleView = (row) => {
    const originalRow = data.find(item => item._id === row._id) || row;
    setFormDialog({ open: true, mode: "view", row: originalRow });
  }

  // Table columns configuration
  const columns = [
    { field: "serial", headerName: "S.No.", type: "serial", minWidth: 40, align: "center" },
    {
      field: "lfaId",
      headerName: "LFA ID",
      minWidth: 100,
      align: "center",
      renderCell: (params) =>
        params.row?.lfaId && (
          <Chip
            label={params.row.lfaId}
            sx={{
              backgroundColor: "oklch(75% 0.145 163.225)",
              color: "#ffffff",
            }}
            size="small"
          />
        ),
    },
    { field: "name", headerName: "Full Name", minWidth: 150, align: "center" },
    {
      field: "interestedWork", headerName: "Interested Work", minWidth: 180, align: "center",
      renderCell: (params) =>
        params.row?.interestedWork && (
          <Chip
            label={params.row.interestedWork}
            sx={{
              backgroundColor: "oklch(75% 0.145 163.225)",
              color: "#ffffff",
            }}
            size="small"
          />
        ),
    },
    { field: "mobileNumber", headerName: "Mo. Number", minWidth: 150, align: "center" },
    { field: "aadhaarFile", headerName: "Aadhaar", type: "file", minWidth: 120, align: "center" },
    { field: "panFile", headerName: "PAN", type: "file", minWidth: 120, align: "center" },
    { field: "bankAccountNumber", headerName: "Account No", minWidth: 130, align: "center" },
    { field: "ifscCode", headerName: "IFSC Code", minWidth: 130, align: "center" },

    { field: "state", headerName: "State", minWidth: 120, align: "center" },
    { field: "district", headerName: "District", minWidth: 120, align: "center" },
    { field: "tehsil", headerName: "Tehsil", minWidth: 120, align: "center" },
    {
      field: "status",
      headerName: "Status",
      type: "status",
      minWidth: 100,
      align: "center",
      renderCell: (params) => {
        const status = params.row?.status;

        const statusColors = {
          pending: { backgroundColor: "#facc15", color: " #222222" },     // Yellow
          approved: { backgroundColor: "#22c55e", color: "#fff" },    // Green
          rejected: { backgroundColor: "#ef4444", color: "#fff" },    // Red
        };

        const { backgroundColor, color } = statusColors[status] || {
          backgroundColor: "#e5e7eb", // Default gray
          color: "#1f2937",
        };

        return (
          <Chip
            label={status}
            size="small"
            sx={{
              backgroundColor,
              color,
              fontWeight: 500,
              borderRadius: "9999px",
            }}
          />
        );
      },
    },
    ...(isAdmin
      ? [
        {
          field: "askOffer",
          headerName: "Ask Offer",
          minWidth: 180,
          align: "center",
          renderCell: (params) => {
            // Find the chatroom for this LFA in allRooms
            const chatRoom = allChatRooms.find(
              room => room.lfaId === params.row._id
            );

            // If chatRoom exists and isDeleted, show Disclosed Offer
            if (chatRoom && chatRoom.isDeleted) {
              return (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleDisclose(params.row)}
                  sx={{
                    backgroundColor: "#f9dedc",
                    color: '#b3261e',
                    textTransform: "none",
                  }}
                >
                  Disclosed Offer
                </Button>
              );
            }

            // Otherwise, show Send Offer
            return (
              <Button
                variant="contained"
                size="small"
                startIcon={<SendIcon />}
                onClick={() => handleSendOffer(params.row)}
                disabled={allChatRooms.some(room => room.lfaId === params.row._id && !room.isDeleted)}
                sx={{
                  backgroundColor: "#3b82f6",
                  "&:hover": {
                    backgroundColor: "#2563eb",
                  },
                  textTransform: "none",
                }}
              >
                Send Offer
              </Button>
            );
          },
        }
        // ...existing code...
      ]
      : []),
    ...(isAdmin
      ? [{
        field: "assignedUserName",
        headerName: "Assigned To",
        minWidth: 180,
        type: "assign",
        align: "center"
      }]
      : []),



    // ✅ New: Action column added directly inside columns
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 140,
      align: "center",
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center" gap={1}>
          <IconButton
            size="small"
            onClick={() => handleView(row)}
            title="View"
            sx={{
              color: "#10b981", // Green/Emerald
              backgroundColor: "#d1fae5", // Light green hover

              "&:hover": {
                backgroundColor: "#d1fae5", // Light green hover
                transform: "scale(1.1)",
              },
            }}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
          {/* View Button - Emerald tone */}
          <IconButton
            size="small"
            onClick={() => handleEdit(row)}
            title="Edit"
            sx={{
              color: "#3b82f6", // Blue
              "&:hover": {
                backgroundColor: "#dbeafe", // Light blue hover
                transform: "scale(1.1)",
              },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>


          <IconButton
            size="small"
            onClick={() => handleDelete(row)}
            title="Delete"
            sx={{
              color: "#ef4444",

              "&:hover": {
                backgroundColor: "#fee2e2",
                transform: "scale(1.1)",
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    }

    // ...existing code...

  ];

  const handleAssign = (row) => {
    setAssignDialog({ open: true, row });
    setSelectedUser(null);
  };

  const handleAssignConfirm = () => {
    if (!selectedUser) return;

    mutate(
      { assignedTo: selectedUser },
      {
        onSuccess: (res) => {
          const assignedUserName = res?.data?.assignment?.assignedTo?.name;

          const updatedData = localData.map(item =>
            item._id === assignDialog.row._id
              ? { ...item, assignedUserName }
              : item
          );

          setLocalData(updatedData);
          setAssignDialog({ open: false, row: null });
          setSelectedUser(null);
        },
        onError: (err) => {
          console.error("Failed to assign:", err);
        },
      }
    );
  };


  // Filtered data
  const filteredData = useMemo(() => {
    return localData.filter((item) => {
      const nameMatch = !searchName || item.name?.toLowerCase().includes(searchName.toLowerCase());
      const lfaMatch = !searchLfaId || item.lfaId?.toLowerCase().includes(searchLfaId.toLowerCase());
      const statusMatch = statusFilter === "all" || item.status === statusFilter;
      return nameMatch && lfaMatch && statusMatch;
    });
  }, [localData, searchName, searchLfaId, statusFilter]);

  // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage
    return filteredData.slice(startIndex, startIndex + rowsPerPage)
  }, [filteredData, page, rowsPerPage])

  // Status counts
  const statusCounts = useMemo(() => {
    return localData.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1
      return acc
    }, {})
  }, [localData])

  // Event handlers
  const handleStatusChange = (row, newStatus) => {
    setStatusChangeDialog({
      open: true,
      row,
      newStatus,
      oldStatus: row.status,
    })
  }

  const confirmStatusChange = () => {
    const { row, newStatus } = statusChangeDialog

    setLocalData((prevData) => prevData.map((item) => (item.id === row.id ? { ...item, status: newStatus } : item)))

    setSnackbar({
      open: true,
      message: `Status updated from ${statusChangeDialog.oldStatus} to ${newStatus} for ${row.fullName}`,
      severity: "success",
    })

    setStatusChangeDialog({ open: false, row: null, newStatus: "", oldStatus: "" })
  }
  const navigate = useNavigate()
  const handleEdit = (row) => {
    const originalRow = data.find(item => item._id === row._id) || row;
    setFormDialog({ open: true, mode: "edit", row: originalRow });
  };


  const handleDelete = (row) => {
    setSnackbar({
      open: true,
      message: `Delete functionality for ${row.fullName}`,
      severity: "warning",
    })
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage)
    setPage(0)
  }

  const handleSendOffer = (row) => {
    setSendOfferDialog({ open: true, row })
  }



  const handleOfferSubmit = (offerData) => {
    const lfa = offerData?.lfa;
    const offerLetter = `Work Offer\n\: ${lfa?.interestedWork || "(No interested work)"}\nLFA ID: ${lfa?.lfaId}\nName: ${lfa?.name}\nDistrict: ${lfa?.district}\nTehsil: ${lfa?.tehsil}\n\nMessage: ${offerData?.message || "(No message)"}`;
    const participants = offerData.participants.map(u => u._id);

    const payload = {
      name: `Offer Discussion - (${lfa?.lfaId})`,
      participants,
      lfaId: lfa?._id,
      offerLetter,
      createdByName: user?.name,
    };

    createChatRoom(payload, {
      onSuccess: () => {
        setSendOfferDialog({ open: false, row: null }); // ✅ Close dialog
        setActiveView("chat"); // ✅ Navigate to chat
      },
      onError: (error) => {
        console.error("Failed to create chat room:", error);
        // Optionally handle additional error logic here
      },
    });
  };



  return (
    <AdminLayout>
      <Container
        maxWidth={false}
        disableGutters
        sx={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}
      >
        {/* Header */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" component="h1" fontWeight={500} sx={{ color: "#16a34a" }}>
            LFA Management System
          </Typography>
          <Box display="flex" gap={1}>
            <Button
              variant={activeView === "table" ? "contained" : "outlined"}
              onClick={() => setActiveView("table")}
              sx={{
                backgroundColor: activeView === "table" ? "#16a34a" : "transparent",
                borderColor: "#16a34a",
                color: activeView === "table" ? "white" : "#16a34a",
                "&:hover": {
                  backgroundColor: activeView === "table" ? "#15803d" : "#f0fdf4",
                },
              }}
            >
              LFA Table
            </Button>
            <Button
              variant={activeView === "chat" ? "contained" : "outlined"}
              onClick={() => setActiveView("chat")}
              sx={{
                backgroundColor: activeView === "chat" ? "#16a34a" : "transparent",
                borderColor: "#16a34a",
                color: activeView === "chat" ? "white" : "#16a34a",
                "&:hover": {
                  backgroundColor: activeView === "chat" ? "#15803d" : "#f0fdf4",
                },
              }}
            >
              Chat Rooms ({nonDeletedChatRoom?.length})
            </Button>
          </Box>
        </Box>

        {activeView === "table" ? (
          <>
            <Grid container spacing={2} >
              {/* Filter Card */}
              <Grid item xs={12} md={6}>
                <Card sx={{ backgroundColor: "white", border: "1px solid #e5e7eb" }}>
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Search by Full Name"
                          value={searchName}
                          onChange={(e) => setSearchName(e.target.value)}
                          InputProps={{
                            startAdornment: <SearchIcon sx={{ color: "#4ade80", mr: 1 }} />,
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&:hover fieldset": { borderColor: "#4ade80" },
                              "&.Mui-focused fieldset": { borderColor: "#16a34a" },
                            },
                            "& .MuiInputLabel-root.Mui-focused": { color: "#16a34a" },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel sx={{ "&.Mui-focused": { color: "#16a34a" } }}>
                            Status Filter
                          </InputLabel>
                          <Select
                            value={statusFilter}
                            label="Status Filter"
                            onChange={(e) => setStatusFilter(e.target.value)}
                            sx={{
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#4ade80",
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#16a34a",
                              },
                            }}
                          >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="approved">Approved</MenuItem>
                            <MenuItem value="rejected">Rejected</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={8}>
                        <Box display="flex" alignItems="center" height="100%">
                          <Typography variant="body2" sx={{ color: "#16a34a", fontWeight: 500 }}>
                            Showing {filteredData.length} of {localData.length} records
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Status Count Cards */}
              <Grid item xs={12} md={6}>
                <Grid container spacing={''} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Card sx={{ backgroundColor: "#fff7ed", border: "1px solid #fed7aa" }}>
                      <CardContent sx={{ textAlign: "center" }}>
                        <Typography variant="h6" sx={{ color: "#fb923c", fontWeight: 600 }}>
                          {statusCounts.pending || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Pending</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card sx={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                      <CardContent sx={{ textAlign: "center" }}>
                        <Typography variant="h6" sx={{ color: "#16a34a", fontWeight: 600 }}>
                          {statusCounts.approved || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Approved</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card sx={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca" }}>
                      <CardContent sx={{ textAlign: "center" }}>
                        <Typography variant="h6" sx={{ color: "#ef4444", fontWeight: 600 }}>
                          {statusCounts.rejected || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Rejected</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card sx={{ backgroundColor: "#f0f9ff", border: "1px solid #bae6fd", width: '5.4rem' }}>
                      <CardContent sx={{ textAlign: "center" }}>
                        <Typography variant="h6" sx={{ color: "#3b82f6", fontWeight: 600 }}>
                          {localData.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">Total  </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Table */}
            <TableDisplay
              data={paginatedData}
              columns={columns}
              page={page}
              rowsPerPage={rowsPerPage}
              totalCount={filteredData.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onAssign={handleAssign}
              editDeleteBtn={true}
            />

            {/* Assign Dialog */}
            <AssignDialog
              open={assignDialog.open}
              usersList={usersList}
              selectedUser={selectedUser}
              onChange={e => setSelectedUser(e.target.value)}
              onClose={() => setAssignDialog({ open: false, row: null })}
              onConfirm={handleAssignConfirm}
              lfaRegion={assignDialog.row ? {
                state: assignDialog.row.state,
                district: assignDialog.row.district,
                tehsil: assignDialog.row.tehsil
              } : {}}
            />

            {/* Edit Form Dialog */}
            {/* <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="md" fullWidth>
              <DialogContent>
                <LfaApplicationForm
                  defaultValues={editRow}
                  onClose={() => setEditOpen(false)}
                  isEditForm={true}
                // You can add an onSubmit prop to handle update logic
                />
              </DialogContent>
            </Dialog> */}


            <Dialog
              open={formDialog.open}
              onClose={() => setFormDialog({ open: false, mode: "edit", row: null })}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle sx={{ color: "#16a34a", fontWeight: 600 }}>
                {formDialog.mode === "view" ? "View LFA Details" : "Edit LFA Application Form"}
              </DialogTitle>
              <DialogContent>
                <LfaApplicationForm
                  defaultValues={formDialog.row}
                  isEditForm={formDialog.mode === "edit"}
                  isViewOnly={formDialog.mode === "view"}
                  onClose={() => setFormDialog({ open: false, mode: "edit", row: null })}
                />
              </DialogContent>
            </Dialog>

            {/* Status Change Confirmation Dialog */}
            <Dialog
              open={statusChangeDialog.open}
              onClose={() => setStatusChangeDialog({ open: false, row: null, newStatus: "", oldStatus: "" })}
              PaperProps={{
                sx: {
                  borderRadius: 2,
                  border: "2px solid #4ade80",
                },
              }}
            >
              <DialogTitle sx={{ color: "#16a34a", fontWeight: 600 }}>Confirm Status Change</DialogTitle>
              <DialogContent>
                <Typography>
                  Are you sure you want to change the status of{" "}
                  <strong style={{ color: "#16a34a" }}>{statusChangeDialog.row?.fullName}</strong> from{" "}
                  <strong style={{ color: "#fb923c" }}>{statusChangeDialog.oldStatus}</strong> to{" "}
                  <strong style={{ color: "#16a34a" }}>{statusChangeDialog.newStatus}</strong>?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setStatusChangeDialog({ open: false, row: null, newStatus: "", oldStatus: "" })}
                  sx={{ color: "#6b7280" }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmStatusChange}
                  variant="contained"
                  sx={{
                    backgroundColor: "#16a34a",
                    "&:hover": {
                      backgroundColor: "#15803d",
                    },
                  }}
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>

            {/* Send Offer Dialog */}
            <SendOfferDialog
              open={sendOfferDialog.open}
              onClose={() => setSendOfferDialog({ open: false, row: null })}
              selectedLFA={sendOfferDialog.row}
              allUsers={usersList}
              onSubmit={handleOfferSubmit}
            />
          </>
        ) : (
          <ChatRoomsPage rooms={chatRooms} />
        )}


        <ConfirmDialog
          open={discloseDialog.open}
          title="Offer Already Disclosed"
          content="This offer has already been disclosed. Do you want to reactivate this LFA offer?"
          onCancel={() => setDiscloseDialog({ open: false, row: null })}
          onConfirm={() => {
            if (discloseDialog.row) {
              reactivateChatRoom({ lfaId: discloseDialog.row._id });
            }
            setDiscloseDialog({ open: false, row: null });
          }}
          confirmLabel="Reactivate"
          cancelLabel="Cancel"
          themeColor="#f59e0b"
        />

      </Container>
    </AdminLayout>
  )
}

export default MainPage