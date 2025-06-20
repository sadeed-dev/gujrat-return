import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { darken } from '@mui/material/styles';

const   ConfirmDialog = ({
  open,
  title,
  content,
  onCancel,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  themeColor = "#16a34a"
}) => (
  <Dialog open={open} onClose={onCancel} PaperProps={{
    sx: {
      borderRadius: 2,
      border: "2px solid #4ade80",
    },
  }}>
    <DialogTitle sx={{ color: themeColor, fontWeight: 600 }}>{title}</DialogTitle>
    <DialogContent>
      <Typography>{content}</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} sx={{ color: "#6b7280" }}>
        {cancelLabel}
      </Button>
      <Button
        onClick={onConfirm}
        variant="contained"
       sx={{
  backgroundColor: themeColor,
  "&:hover": {
    backgroundColor: darken(themeColor, 0.2), // darken by 20%
  },
}}

      >
        {confirmLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;