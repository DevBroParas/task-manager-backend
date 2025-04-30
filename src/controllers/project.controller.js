import express from "express";
import Project from "../models/project.model";
import User from "../models/user.model";

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
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (error) {
    next(error);
  }
};
