import Task from "../models/task.model.js";
import Project from "../models/project.model.js";

export const CreateTask = async (req, res, next) => {
  try {
    const { title, description, status, projectId } = req.body;

    if (!title || !description || !status || !projectId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const task = new Task({
      title,
      description,
      status,
      project: projectId,
    });
    await task.save();

    await Project.findByIdAndUpdate(projectId, {
      $push: { tasks: task._id },
    });

    res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
};

export const GetAllTasks = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find({ project: projectId });
    res.status(200).json({ tasks });
  } catch (error) {
    next(error);
  }
};

export const GetSingleTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
};

export const UpdateTask = async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ task: updatedTask });
  } catch (error) {
    next(error);
  }
};

export const DeleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Project.findByIdAndUpdate(task.project, {
      $pull: { tasks: task._id },
    });

    res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
};
