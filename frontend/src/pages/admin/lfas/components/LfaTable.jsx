// components/partials/LfaFilters.jsx
import React, { useState, useMemo } from "react"
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import StatusCards from "./StatusCards"
import TableDisplay from "../../../../shared/DataTable"
import AssignDialog from "../dialog-box/AssignDialog"
import SendOfferDialog from "../offfer-lfa/SendOfferDialog"
import ConfirmDialog from "../dialog-box/ConfirmDialog"
import TableSkeleton from "../../../../shared/TableSkelton"
import LfaFormDialog from "./LfaFormDialog"
import StatusChangeDialog from "./StatusChangeDialog"
import { useAssignTo } from "../../../../hook/use-Lfa.hook"
import { useNavigate } from "react-router-dom"
import { useCreateChatRoom, useReactivateChatroom } from "../../../../hook/use-lfachat.hook"
import { getLfaTableColumns } from "./LfaColumns"
import { useAuth } from "../../../../context/auth/AuthContext"
import ColumnVisibilityToggle from "../../../../shared/ColumnVisibilityToggle"
import useColumnVisibility from "../../../../hook/use-columnVisibility.hook"
const LfaTable = ({ lfaData = [], usersList = [], lfaLoading, chatRooms, refetch, setActiveView,
}) => {
  const navigate = useNavigate()

  const [searchName, setSearchName] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const { mutate: createChatRoom, isPending} = useCreateChatRoom();
  

  const { user } = useAuth()
  const [assignDialog, setAssignDialog] = useState({ open: false, row: null })
  const [selectedUser, setSelectedUser] = useState(null)
  const [sendOfferDialog, setSendOfferDialog] = useState({ open: false, row: null })
  const [discloseDialog, setDiscloseDialog] = useState({ open: false, row: null })
  const [formDialog, setFormDialog] = useState({ open: false, row: null })
  const [statusDialog, setStatusDialog] = useState({ open: false, row: null, newStatus: "", oldStatus: "" })

  const nonDeletedRooms = chatRooms?.filter(room => !room?.isDeleted)
  const isAdmin = true // Assume always true in this version

  const localData = useMemo(() => {
    if (!Array.isArray(lfaData)) return []
    return lfaData.map((lfa) => ({
      ...lfa,
      interestedWork: Array.isArray(lfa.interestedWork) ? lfa.interestedWork.join(", ") : lfa.interestedWork || "-",
      assignedUserName: lfa?.assignment?.assignedTo?.name || "-",
    }))
  }, [lfaData])

  const filteredData = useMemo(() => {
    return localData.filter(item => {
      const nameMatch = !searchName || item.name?.toLowerCase().includes(searchName.toLowerCase())
      const statusMatch = statusFilter === "all" || item.status === statusFilter
      return nameMatch && statusMatch
    })
  }, [localData, searchName, statusFilter])

  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage
    return filteredData.slice(start, start + rowsPerPage)
  }, [filteredData, page, rowsPerPage])

  const statusCounts = useMemo(() => {
    return localData.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1
      return acc
    }, {})
  }, [localData])

  const handleAssign = (row) => {
    setAssignDialog({ open: true, row })
    setSelectedUser(null)
  }

  const handleEdit = (row) => {
    const original = lfaData.find(item => item._id === row._id) || row
    setFormDialog({ open: true, row: original })
  }

  const handleView = (row) => {
    navigate(`/admin/lfas/view/${row._id}`)
  }

  const handleDelete = (row) => {
    console.log("DELETE", row.fullName)
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
      onSuccess: (res) => {
        setSendOfferDialog({ open: false, row: null });
        setActiveView("chat");
      },
      onError: (error) => {
        console.error("Chat creation failed", error);
      }
    });
  }

  const handleSendOffer = (row) => {
    setSendOfferDialog({ open: true, row })
  }

  const handleDisclose = (row) => {
    setDiscloseDialog({ open: true, row })
  }


  const allColumns = getLfaTableColumns({
    isAdmin,
    handleView,
    handleEdit,
    handleDelete,
    handleSendOffer,
    handleDisclose,
    allChatRooms: chatRooms,
  });
  
  const {
    visibility,
    setValue,
    toggleField
  } = useColumnVisibility(allColumns, "lfaTable");
  const visibleColumns = allColumns.filter(col => visibility[col.field] !== false);

  const { mutate: assignTo, isPending:assignPending } = useAssignTo(assignDialog.row?._id)
  const { mutate: reactivateChatRoom } = useReactivateChatroom()

  const handleAssignConfirm = () => {
    if (!selectedUser) return
    assignTo(
      { assignedTo: selectedUser },
      {
        onSuccess: () => {
          setAssignDialog({ open: false, row: null })
          refetch()
        },
        onError: (err) => {
          console.error("Assign failed", err)
        }
      }
    )
  }

  const confirmStatusChange = () => {
    // Add logic if needed
    setStatusDialog({ open: false, row: null, newStatus: "", oldStatus: "" })
  }

  return (
    <>
      <Grid container spacing={2} marginBottom={'.5rem'}>
        {/* Filters */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "white", border: "1px solid #e5e7eb" }}>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Search by Full Name"
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
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
                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#4ade80" },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#16a34a" },
                      }}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="approved">Approved</MenuItem>
                      <MenuItem value="rejected">Rejected</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Status Cards */}
        <Grid item xs={12} md={6}>
          <StatusCards statusCounts={statusCounts} total={localData.length} />
        </Grid>

      {/* Column Visibility Toggle */}

          <Box mt={2}>
<ColumnVisibilityToggle
  columns={allColumns}
  visibility={visibility}
  setValue={setValue}
  toggleField={toggleField}
/>

      </Box>
      </Grid>

    

      {/* Table */}
      {lfaLoading ? (
        <TableSkeleton columns={6} rows={paginatedData?.length} />
      ) : (
        <TableDisplay
          data={paginatedData}
                columns={visibleColumns}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={filteredData.length}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAssign={handleAssign}
          onStatusChange={(row, newStatus) =>
            setStatusDialog({ open: true, row, newStatus, oldStatus: row.status })
          }
          editDeleteBtn={true}
        />
      )}

      {/* Dialogs */}
      <AssignDialog
        open={assignDialog.open}
        usersList={usersList}
        selectedUser={selectedUser}
        onChange={e => setSelectedUser(e.target.value)}
        onClose={() => setAssignDialog({ open: false, row: null })}
        onConfirm={handleAssignConfirm}
        assignPending={assignPending}
      />


      <SendOfferDialog
        open={sendOfferDialog.open}
        onClose={() => setSendOfferDialog({ open: false, row: null })}
        selectedLFA={sendOfferDialog.row}
        allUsers={usersList}
        onSubmit={handleOfferSubmit}
        isPending={isPending}
      />

      <ConfirmDialog
        open={discloseDialog.open}
        title="Offer Already Disclosed"
        content="This offer has already been disclosed. Reactivate it?"
        onCancel={() => setDiscloseDialog({ open: false, row: null })}
        onConfirm={() => {
          if (discloseDialog.row) {
            reactivateChatRoom({ lfaId: discloseDialog.row._id })
          }
          setDiscloseDialog({ open: false, row: null })
        }}
        confirmLabel="Reactivate"
        cancelLabel="Cancel"
        themeColor="#f59e0b"
      />

      <LfaFormDialog formDialog={formDialog} setFormDialog={setFormDialog} />

      <StatusChangeDialog dialog={statusDialog} setDialog={setStatusDialog} onConfirm={confirmStatusChange} />
    </>
  )
}

export default LfaTable
