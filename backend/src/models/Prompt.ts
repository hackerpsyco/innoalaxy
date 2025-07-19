import mongoose, { Document, Schema } from 'mongoose';

export interface IPrompt extends Document {
  title: string;
  content: string;
  tool: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  dateAdded: Date;
  isDaily: boolean;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const promptSchema = new Schema<IPrompt>({
  title: {
    type: String,
    required: [true, 'Prompt title is required'],
    trim: true,
    maxlength: [150, 'Title cannot exceed 150 characters'],
  },
  content: {
    type: String,
    required: [true, 'Prompt content is required'],
    trim: true,
    maxlength: [2000, 'Content cannot exceed 2000 characters'],
  },
  tool: {
    type: String,
    required: [true, 'Tool is required'],
    enum: ['ChatGPT', 'Midjourney', 'Claude', 'DALL-E', 'Stable Diffusion', 'Other'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Marketing', 'Design', 'Development', 'Social Media', 'Art', 'Data Science', 'Email Marketing', 'Copywriting', 'Documentation', 'Branding'],
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  tags: [{
    type: String,
    trim: true,
  }],
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  isDaily: {
    type: Boolean,
    default: false,
  },
  usageCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Indexes
promptSchema.index({ tool: 1 });
promptSchema.index({ category: 1 });
promptSchema.index({ difficulty: 1 });
promptSchema.index({ isDaily: 1 });
promptSchema.index({ usageCount: -1 });
promptSchema.index({ title: 'text', content: 'text' });

export default mongoose.model<IPrompt>('Prompt', promptSchema);