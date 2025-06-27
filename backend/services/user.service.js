import User from '../models/user.model.js';
import { uploadFileToS3 } from './s3.service.js';

export const handleGetAllUsers = async (filters) => {

  const query = {
    isDeleted: { $ne: true },
    status: { $ne: "rejected" },
  };

  if(filters.search){
    query.$or = [
      { name : {$regex: filters.search, $options:'i'}},
      { email : { $regex: filters.search, $options:'i'}}
    ]
  }  
  // Apply Role Filter
  if (filters.role) {
    query.role = filters.role;
  }

  // Apply Approval Status Filter
  if (filters.status) {
    query.status = filters.status;
  }

  const users = await User.find(query).select("-password");
  return users;
};




export const handleGetUser = async (id) => {
return  await  User.findOne({_id:id});
};



export const handleUpdateUser = async (req) => {
  
   const userId = req.user._id;
    const userRole = req.user.role; // assuming role exists: 'admin' or 'user'
    const id = req.params.id;
  
    // Allow admin to update any LFA, regular users only their own
  
    const existingUser = await User.findOne(userId);
  // File handling
   const aadhaarFile = req.files?.['aadhaarFile']?.[0];
  const panFile = req.files?.['panFile']?.[0];

  let aadhaarUploadUrl = existingUser.aadhaarFile;
  let panUploadUrl = existingUser.panFile;

  if (aadhaarFile) {
    const { Location } = await uploadFileToS3(aadhaarFile, 'aadhaar');
    aadhaarUploadUrl = Location;
  }

  if (panFile) {
    const { Location } = await uploadFileToS3(panFile, 'pan');
    panUploadUrl = Location;
  }

   // Extract form fields from req.body
    const { name, email, state, district, tehsil } = req.body;

    // Prepare updated data
    const updatedData = {
      name,
      email,
      state,
      district,
      tehsil,
      aadhaarFile: aadhaarUploadUrl,
      panFile: panUploadUrl,
    };

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
    return updatedUser;
};


export const handleDeleteUser = async (id) => {
  const deletedUser =  await User.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    return deletedUser
}




  export const handleUpdateUserStatus = async (id, data) => {
    
  const updateUser =await  User.findByIdAndUpdate(id, data, { new: true });
  return updateUser
  };
