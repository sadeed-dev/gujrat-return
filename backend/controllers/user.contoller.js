import { handleGetAllUsers, handleUpdateUser,handleGetUser, handleDeleteUser ,handleUpdateUserStatus} from "../services/user.service.js";

export const getAllUsers = async (req, res) => {
  try {
    const filters = {
      search: req.query.search || "",
      role: req.query.role || "",
      status: req.query.status || "",
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };

    const { users, total, page, limit, totalPages } = await handleGetAllUsers(filters);

    res.status(200).json({
      message: 'Users getting successful',
      data: users,        // only the user array here
      total,
      page,
      limit,
      totalPages
    });

  } catch (error) {
    console.error('Failed getting Users:', error);
    res.status(500).json({ message: 'Failed getting Users', error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const {id} = req.params
    const result = await handleGetUser(id);
    res.status(201).json({ message: 'User getting successfull', data: result });
  } catch (error) {
    console.error('Failed getting Users:', error);
    res.status(500).json({ message: 'Failed getting User', error: error.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await handleUpdateUser(req);
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user' });
  }
};





export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await handleDeleteUser(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};



export const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedUserStatus = await handleUpdateUserStatus(req.params.id, { status });

    if (!updatedUserStatus) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUserStatus);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user status' });
  }
};
