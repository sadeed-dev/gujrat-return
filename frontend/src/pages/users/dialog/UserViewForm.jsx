import React, { useEffect, useState } from 'react'
import UserEditForm from './UserEditForm'
import { useGetUser } from '../../../hook/use-user.hook';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, DialogContent, DialogActions , Button, DialogTitle} from '@mui/material';

const UserViewForm = () => {

  const navigate = useNavigate()
  const {id} = useParams();
  const [open, setOpen] = useState(true);
  const {data} = useGetUser(id);


  const handleClose = () => {
    navigate(-1);   
  };
  useEffect(() => {
    setOpen(true); 
  }, [id]);



  return (
    <div>


 <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>View User</DialogTitle>
        <DialogContent>
          <UserEditForm
            defaultValues={data?.data}
            onClose={handleClose}
                  isViewOnly={true}

          />
        </DialogContent>
      </Dialog>

          {/* <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
              <DialogTitle>
        View Form
      <DialogContent>

     
      
    <UserEditForm
      defaultValues={data?.data}
      onClose={handleClose}
      onSubmit={() => {}} // not used in view-only
      isViewOnly={true}
    /> 

      </DialogContent>
                  </DialogTitle>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog> */}
   </div>
  )
}

export default UserViewForm
