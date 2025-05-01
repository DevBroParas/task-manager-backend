import Task from "../models/task.model.js";
import Project from "../models/project.model.js";

// Create Task
export const CreateTask = async (req, res, next) => {
    try {
        const { title, description, status, projectId } = req.body;
        const userId = req.user._id;

        if (!title || !description || !status || !projectId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const task = new Task({
            title,
            description,
            status,
            project: projectId,
            user: userId,
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

        const tasks = await Task.find({
            project: projectId,
            user: req.user._id,
        });

        if (tasks.length === 0) {
            return res
                .status(404)
                .json({ message: "No tasks found or not authorized" });
        }

        res.status(200).json({ tasks });
    } catch (error) {
        next(error);
    }
};

// Get Single Task
export const GetSingleTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ _id: id, user: req.user._id });

        if (!task) {
            return res
                .status(404)
                .json({ message: "Task not found or not authorized" });
        }

        res.status(200).json({ task });
    } catch (error) {
        next(error);
    }
};

// Update Task
export const UpdateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findOneAndUpdate(
            { _id: id, user: req.user._id },
            { ...req.body },
            { new: true }
        );

        if (!updatedTask) {
            return res
                .status(404)
                .json({ message: "Task not found or not authorized" });
        }

        res.status(200).json({ task: updatedTask });
    } catch (error) {
        next(error);
    }
};

// Delete Task
export const DeleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndDelete({
            _id: id,
            user: req.user._id,
        });

        if (!task) {
            return res
                .status(404)
                .json({ message: "Task not found or not authorized" });
        }

        await Project.findByIdAndUpdate(task.project, {
            $pull: { tasks: task._id },
        });

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
};
