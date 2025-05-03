import Project from "../models/project.model.js";
import User from "../models/user.model.js";

export const CreateProject = async (req, res, next) => {
    try {
        const { name } = req.body;

        if (!name)
            return res.status(400).json({ message: "All fields are required" });

        const user = req.user;

        const userDoc = await User.findById(user._id);
        if (userDoc.projects.length >= 4) {
            return res.status(400).json({ message: "Project limit reached" });
        }

        const project = new Project({ name, user: user._id });
        await project.save();

        userDoc.projects.push(project._id);
        await userDoc.save();

        res.status(201).json({ project });
    } catch (err) {
        next(err);
    }
};

export const GetProjects = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const projects = await Project.find({ user: userId });

        res.status(200).json({ projects });
    } catch (error) {
        next(error);
    }
};

export const GetSingleProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        res.status(200).json({ project });
    } catch (error) {
        next(error);
    }
};

export const UpdateProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedProject = await Project.findOneAndUpdate(
            { _id: id, user: req.user._id },
            { ...req.body },
            { new: true }
        );
        res.status(200).json({ project: updatedProject });
    } catch (error) {
        next(error);
    }
};

export const DeleteProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await Project.findOneAndDelete({
            _id: id,
            user: req.user._id,
        });
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        next(error);
    }
};
