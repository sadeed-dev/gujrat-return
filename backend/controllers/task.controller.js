import Task from '../models/task.model.js';
import { deleteFileFromS3 } from '../services/s3.service.js';
import { handleSubmitAssingedTask,handlegetAllCompletedTask,handleReviewCompletedTask, handleUpdateAssingedTask } from '../services/task.service.js';

export const submitAssingedTask = async (req, res) => {
  try {
    const newUser = await handleSubmitAssingedTask(req);
    res.status(201).json({ message: 'Submitted assigned task', user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const reviewCompletedTask = async (req, res) => {
  try {
    const { lfaId } = req.params
    const task = await handleReviewCompletedTask(lfaId);
 
    res.status(201).json({ message: 'Task getting successfull', data: task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllCompletedTask = async (req, res) => {
  try {
    const task = await handlegetAllCompletedTask();
 
    res.status(201).json({ message: 'Tasks getting successfull', data: task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};  


export const updateAssingedTask = async (req, res) => {
  try {
    
    const task = await handleUpdateAssingedTask(req);
 
    res.status(201).json({ message: 'Task update successfull', data: task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};  


export const deleteTaskImage = async (req, res) => {
  try {
    const { taskId, imageUrl } = req.body;
    // Remove from S3
    await deleteFileFromS3(imageUrl);
    // Remove from DB
    await Task.findByIdAndUpdate(taskId, { $pull: { images: imageUrl } });
    res.json({ success: true, message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
    console.log(err)
  }
};
