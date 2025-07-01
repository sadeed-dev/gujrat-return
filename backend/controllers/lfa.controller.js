import { handleLfaSubmission, handleGetAllLFA,
   handleGetAssignedLFAs, handleGetLFA, handleAssignedLFA,
    handleGetAllAssignedLFAs ,handleUpdateLfaStatus , handleUpdateLFA} from '../services/lfa.service.js';



export const submitLFAForm = async (req, res) => {
  try {
    const result = await handleLfaSubmission(req); // No session passed
    res.status(201).json({ message: 'Submission successful', data: result });
  } catch (error) {
    console.error('LFA Submission Error:', error);
    res.status(500).json({ message: 'Failed to submit', error: error.message });
  }
};


export const getAllLFA = async (req, res) => {
  try {
    const { role, id: userId } = req.user;
    const filters = req.query; 
    // Call service function
    const lfas = await handleGetAllLFA(role, userId, filters);
    res.status(200).json({ message: 'getting Lfa successful', data: lfas });
  } catch (error) {
    res.status(500).json({ message: "Failed to get LFA Applications", error: error.message });
  }
};





export const getLFA = async (req, res) => {
  try {
    const result = await handleGetLFA(req.params.id)
    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({ message: "Failed to get Lfa Application", error });

  }
}


export const assignedLFA = async (req, res) => {
  try {
    const { lfaId } = req.params;
    const { assignedTo } = req.body;
    const assignedBy = req.user?._id; // assuming user is authenticated and available via middleware

    if (!assignedTo) {
      return res.status(400).json({ message: 'assignedTo is required' });
    }

    const result = await handleAssignedLFA(lfaId, assignedBy, assignedTo);

    res.status(200).json({ message: 'LFA Application assigned successfully', data: result });
  } catch (error) {
    res.status(500).json({ message: 'LFA Application not assigned', error: error.message });
  }
};



export const getAssignedLFAs = async (req, res) => {
  try {
    const userId = req.user._id; // Automatically available via authMiddleware

    const assignedLFAs = await handleGetAssignedLFAs(userId);

    res.status(200).json({
      message: 'Assigned tasks fetched successfully',
      data: assignedLFAs,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch assigned tasks',
      error: error.message,
    });
  }
};



export const getAllAssignedLFAs = async (req, res) => {
  try {
        const user = req.user; // Automatically available via authMiddleware
     const filters = req.query
    const assignedLFAs =  await handleGetAllAssignedLFAs(user,filters);

    res.status(200).json({
      message: 'Assigned tasks fetched successfully',
     ...assignedLFAs
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch assigned tasks',
      error: error.message,
    });
    console.log(error)
  }
};


export const updateLfaStatus = async (req, res) => {
  try {
    const { lfaId } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedLfa = await handleUpdateLfaStatus(lfaId, status);

    res.status(200).json({
      message: `LFA status updated to ${status} successfully`,
      data: updatedLfa,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update LFA status',
      error: error.message,
    });
    console.error(error);
  }
};




export const updateLFA = async (req, res) => {
  try {     
    const updatedLfa = await handleUpdateLFA(req);

    res.status(200).json({
      message: `LFA  updated  successfully`,
      data: updatedLfa,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update LFA ',
      error: error.message,
    });
    console.error(error);
  }
};


