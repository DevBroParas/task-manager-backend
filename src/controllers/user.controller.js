import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res, next) => {
    try {
        const { name, email, password, country } = req.body;

        if (!name || !email || !password || !country) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            country,
        });

        // ✅ Save user first
        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        const userObject = savedUser.toObject(); // ensures plain JS object
        const { password: _, ...userWithoutPassword } = userObject;

        res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
        console.error("REGISTER ERROR:", error);
        next(error);
    }
};

export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        const { password: _, ...userWithoutPassword } = user;

        res.status(200).json({ user: userWithoutPassword });
        console.log("userCreated:", user);
    } catch (error) {
        next(error);
    }
};

export const Logout = async (req, res, next) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        next(error);
    }
};

export const Me = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        res.status(200).json({ user: req.user });
    } catch (error) {
        next(error);
    }
};
