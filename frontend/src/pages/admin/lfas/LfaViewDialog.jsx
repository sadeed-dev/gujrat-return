
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
  const {lfaId} = useParams();
  const [open, setOpen] = useState(true);
  const {data} = useGetLFAs(lfaId);
  console.log(data)

  const handleClose = () => {
    setOpen(false);
    navigate("/admin/lfas"); 
  };

  useEffect(() => {
    setOpen(true); 
  }, [lfaId]);



  
  return (
          <Dialog open={open} onClose={handleClose}  maxWidth="sm" fullWidth>
    
    
      <DialogContent>
     <LfaApplicationForm id={lfaId} onClose={handleClose}
     defaultValues={data} isViewOnly={true} 
      />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
