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
  MenuItem,
  IconButton,
  useMediaQuery
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
import { useAssignTo, useGetAllLFAs } from "../../../../hook/use-Lfa.hook"
import { useNavigate } from "react-router-dom"
import { useCreateChatRoom, useReactivateChatroom } from "../../../../hook/use-lfachat.hook"
import { getLfaTableColumns } from "./LfaColumns"
import { useAuth } from "../../../../context/auth/AuthContext"
import useColumnVisibility from "../../../../hook/use-columnVisibility.hook"
import { FormProvider, useForm } from "react-hook-form"
import LfaFilters from "../filter/LfaFilters"
import ColumnVisibilityToggle from "../../../../shared/ColumnVisibilityToggle"
import FilterListIcon from "@mui/icons-material/FilterList";


const LfaTable = ({ usersList = [],chatRooms, refetch, setActiveView,
}) => {
  const navigate = useNavigate()

  
  const { mutate: createChatRoom, isPending} = useCreateChatRoom();

  const isMobile = useMediaQuery("(max-width:600px)");
const [showFilters, setShowFilters] = useState(false);

  const { user } = useAuth()
  const [assignDialog, setAssignDialog] = useState({ open: false, row: null })
  const [selectedUser, setSelectedUser] = useState(null)
  const [sendOfferDialog, setSendOfferDialog] = useState({ open: false, row: null })
  const [discloseDialog, setDiscloseDialog] = useState({ open: false, row: null })
  const [formDialog, setFormDialog] = useState({ open: false, row: null })
  const [statusDialog, setStatusDialog] = useState({ open: false, row: null, newStatus: "", oldStatus: "" })
      const [appliedFilters, setAppliedFilters] = useState({});

  const methods = useForm({
    defaultValues: {
      search: "",
      status: "",
    },
  });

  const { getValues, setValue: setFormValue } = methods;

    // 🔗 Fetch paginated LFA data from backend
  const { data: lfaData, isLoading: lfaLoading } = useGetAllLFAs({
    ...appliedFilters,
    page: appliedFilters.page + 1, // backend expects 1-based
  });




  const localData = useMemo(() => {
    if (!Array.isArray(lfaData?.data?.data)) return []
    return lfaData?.data?.data?.map((lfa) => ({
      ...lfa,
      interestedWork: Array.isArray(lfa.interestedWork) ? lfa.interestedWork.join(", ") : lfa.interestedWork || "-",
      assignedUserName: lfa?.assignment?.assignedTo?.name || "-",
    }))
  }, [lfaData])


  console.log(lfaData)

  // const statusCounts = useMemo(() => {
  //   return localData.reduce((acc, item) => {
  //     acc[item.status] = (acc[item.status] || 0) + 1
  //     return acc
  //   }, {})
  // }, [localData])

  const handleAssign = (row) => {
    setAssignDialog({ open: true, row })
    setSelectedUser(null)
  }

  const handleEdit = (row) => {
    const original = lfaData.find(item => item._id === row._id) || row
    setFormDialog({ open: true, row: original })
  }


  const handleDelete = (row) => {
    console.log("DELETE", row.fullName)
  }



  const handleOfferSubmit = (offerData) => {
    const lfa = offerData?.lfa;
const offerLetter = `Work Offer
Interested Work: ${lfa?.interestedWork || "(No interested work)"}
Remark: ${lfa?.remark || "(No remark)"}
LFA ID: ${lfa?.lfaId}
Name: ${lfa?.name}
District: ${lfa?.district}
Tehsil: ${lfa?.tehsil}
Message: ${offerData?.message || "(No message)"}`

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


  const allColumns = getLfaTableColumns({
    isAdmin: true,
    handleView: row => navigate(`/admin/lfas/view/${row._id}`),
    handleEdit: row => setFormDialog({ open: true, row }),
    handleDelete: row => console.log("DELETE", row.fullName),
    handleSendOffer: row => setSendOfferDialog({ open: true, row }),
    handleDisclose: row => setDiscloseDialog({ open: true, row }),
    allChatRooms: chatRooms,
  });

  const {
    visibility,
    setValue:setValues,
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



  // ✅ Handlers
  const handleSearchEnter = () => {
    const filters = getValues();
    setAppliedFilters(prev => ({
      ...prev,
      search: filters.search || "",
      page: 0,
    }));
  };

  const handleApplyFilters = () => {
    const filters = getValues();
    setAppliedFilters(prev => ({
      ...prev,
      search: filters.search || "",
      status: filters.status || "",
      page: 0,
    }));
  };

  const handleClearFilters = () => {
    setFormValue("search", "");
    setFormValue("status", "");
    setAppliedFilters({
      page: 0,
      limit: 5,
      search: "",
      status: "",
    });
  };

  const handlePageChange = newPage => {
    setAppliedFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleRowsPerPageChange = newLimit => {
    setAppliedFilters(prev => ({ ...prev, limit: newLimit, page: 0 }));
  };

  
  return (
    <>
      <Grid container spacing={2} marginBottom={'.5rem'}>

        {/* Status Cards */}
        {/* <Grid item xs={12} md={6}>
          <StatusCards statusCounts={statusCounts} total={localData.length} />
        </Grid> */}

      {/* Column Visibility Toggle */}

    {isMobile && (
      <IconButton
        onClick={() => setShowFilters((prev) => !prev)}
        sx={{ color: "#16a34a" }}
      >
        <FilterListIcon />
      </IconButton>
    )}

        {(!isMobile || showFilters) && (

<FormProvider {...methods}>

      <LfaFilters
        onSearchEnter={handleSearchEnter}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
        userCount={localData?.length || 0}

          columns={allColumns}
    visibility={visibility}
    setValues={setValues}
    toggleField={toggleField}
      />
      </FormProvider>
  )}






      </Grid>

    
{console.log(localData)}
      {/* Table */}
      {lfaLoading ? (
        <TableSkeleton columns={6} rows={localData?.length} />
      ) : (
  <TableDisplay
    data={localData}
          columns={visibleColumns}
          page={appliedFilters.page}
          rowsPerPage={appliedFilters.limit}
          totalCount={lfaData?.data?.total || 0}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
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
