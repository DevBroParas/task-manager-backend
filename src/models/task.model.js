import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'in-progress', 'completed'],
    },
    completedAt: Date,

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
