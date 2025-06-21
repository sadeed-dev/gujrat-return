
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LfaApplicationForm from "../../form/LfaApplicationForm";
import { useGetLFAs } from "../../../hook/use-Lfa.hook";

export default function LfaViewDialog() {
    const [formDialog, setFormDialog] = useState({ open: false, mode: "edit", row: null });
  
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(true);

  const {data} = useGetLFAs(id);
  console.log(data)

  const handleClose = () => {
    setOpen(false);
    navigate("/admin/lfas"); 
  };

  useEffect(() => {
    setOpen(true); 
  }, [id]);



  
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogContent>
     <LfaApplicationForm id={id} onClose={handleClose}
     defaultValues={data} isViewOnly={true} 
      />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
