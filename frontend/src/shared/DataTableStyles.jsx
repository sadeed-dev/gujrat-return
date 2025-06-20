
// Styled components with OKLCH theme
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "16px",
  overflow: "hidden",
  marginTop: "24px",
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  border: "1px solid #f3f4f6",
  background: "linear-gradient(145deg, #ffffff 0%, #fafafa 100%)",
}))

const StyledTableContainer = styled(TableContainer)({
  maxHeight: 600,
  "&::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f5f9",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "oklch(0.7 0.15 160deg)",
    borderRadius: "4px",
    "&:hover": {
      background: "oklch(0.65 0.15 160deg)",
    },
  },
})

const StyledTableHead = styled(TableHead)({
  background: "linear-gradient(135deg, oklch(0.7 0.15 160deg) 0%, oklch(0.75 0.12 170deg) 100%)",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: "linear-gradient(90deg, oklch(0.8 0.15 170deg), oklch(0.6 0.15 150deg))",
  },
})

const StyledHeaderCell = styled(TableCell)({
  color: "#ffffff",
  fontWeight: 700,
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  padding: "20px 24px",
  whiteSpace: "nowrap",
  position: "relative",
  background: "transparent",
  borderBottom: "none",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: 0,
    width: "3px",
    height: "60%",
    background: "rgba(255, 255, 255, 0.3)",
    transform: "translateY(-50%)",
    borderRadius: "0 2px 2px 0",
  },
  "&:first-of-type::before": {
    display: "none",
  },
})

const StyledTableRow = styled(TableRow)(({ index }) => ({
  backgroundColor: index % 2 === 0 ? "#ffffff" : "#fafafa",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  "&:hover": {
    backgroundColor: "oklch(0.98 0.02 160deg)",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    "& .action-buttons": {
      opacity: 1,
      transform: "translateX(0)",
    },
  },
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "4px",
    background: "transparent",
    transition: "background 0.3s ease",
  },
  "&:hover::before": {
    background: "linear-gradient(180deg, oklch(0.7 0.15 160deg), oklch(0.75 0.12 170deg))",
  },
}))

const StyledTableCell = styled(TableCell)({
  padding: "16px 24px",
  color: "#111827",
  fontSize: "0.875rem",
  borderBottom: "1px solid #f1f5f9",
  whiteSpace: "nowrap",
  position: "relative",
})

const StyledChip = styled(Chip)(({ chiptype }) => {
  const getChipStyles = () => {
    switch (chiptype) {
      case "lfa":
        return {
          background: "linear-gradient(135deg, oklch(0.7 0.15 160deg) 0%, oklch(0.75 0.12 170deg) 100%)",
          color: "#ffffff",
          fontWeight: 700,
          fontSize: "0.75rem",
          letterSpacing: "0.5px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          border: "1px solid oklch(0.8 0.1 165deg)",
        }
      case "Approved":
        return {
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          color: "#ffffff",
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
          border: "1px solid #34d399",
          "&::before": {
            content: '""',
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            marginRight: "6px",
            display: "inline-block",
          },
        }
      case "rejected":
        return {
          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          color: "#ffffff",
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(239, 68, 68, 0.3)",
          border: "1px solid #f87171",
          "&::before": {
            content: '""',
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            marginRight: "6px",
            display: "inline-block",
          },
        }
      case "pending":
        return {
          background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          color: "#ffffff",
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(245, 158, 11, 0.3)",
          border: "1px solid #fbbf24",
          "&::before": {
            content: '""',
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            marginRight: "6px",
            display: "inline-block",
            animation: "pulse 2s infinite",
          },
        }
      default:
        return {
          background: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
          color: "#ffffff",
          fontWeight: 600,
        }
    }
  }

  return {
    ...getChipStyles(),
    borderRadius: "12px",
    height: "28px",
    fontSize: "0.75rem",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
      transform: "translateY(-1px) scale(1.05)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    },
    "@keyframes pulse": {
      "0%, 100%": {
        opacity: 1,
      },
      "50%": {
        opacity: 0.5,
      },
    },
  }
})

const StyledTablePagination = styled(TablePagination)({
  borderTop: "2px solid #f1f5f9",
  background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
  "& .MuiTablePagination-toolbar": {
    padding: "16px 24px",
    minHeight: "64px",
  },
  "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
    fontSize: "0.875rem",
    color: "#4b5563",
    fontWeight: 500,
  },
  "& .MuiTablePagination-select": {
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    padding: "4px 8px",
    backgroundColor: "#ffffff",
    "&:focus": {
      borderColor: "oklch(0.7 0.15 160deg)",
      boxShadow: "0 0 0 3px oklch(0.95 0.05 160deg)",
    },
  },
  "& .MuiTablePagination-actions": {
    "& .MuiIconButton-root": {
      borderRadius: "8px",
      margin: "0 2px",
      padding: "8px",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "oklch(0.7 0.15 160deg)",
        color: "#ffffff",
        transform: "scale(1.1)",
      },
      "&.Mui-disabled": {
        opacity: 0.4,
        "&:hover": {
          backgroundColor: "transparent",
          transform: "none",
        },
      },
    },
  },
})

const EmptyStateContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "48px 24px",
  textAlign: "center",
})

const EmptyStateIcon = styled("div")({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, oklch(0.95 0.05 160deg) 0%, oklch(0.98 0.02 170deg) 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "16px",
  border: "2px solid oklch(0.9 0.05 160deg)",
  "& svg": {
    width: "32px",
    height: "32px",
    color: "oklch(0.7 0.15 160deg)",
  },
})

const EmptyStateText = styled("div")({
  "& h3": {
    margin: 0,
    fontSize: "1.125rem",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "8px",
  },
  "& p": {
    margin: 0,
    fontSize: "0.875rem",
    color: "#6b7280",
  },
})
