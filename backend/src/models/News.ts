import mongoose, { Document, Schema } from 'mongoose';

export interface INews extends Document {
  title: string;
  summary: string;
  link: string;
  date: Date;
  source: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema = new Schema<INews>({
  title: {
    type: String,
    required: [true, 'News title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  summary: {
    type: String,
    required: [true, 'News summary is required'],
    trim: true,
    maxlength: [500, 'Summary cannot exceed 500 characters'],
  },
  link: {
    type: String,
    required: [true, 'News link is required'],
    validate: {
      validator: function(v: string) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Please provide a valid URL',
    },
  },
  date: {
    type: Date,
    required: [true, 'News date is required'],
  },
  source: {
    type: String,
    required: [true, 'News source is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Product Launch', 'Research', 'Open Source', 'Video AI', 'AI Safety', 'Productivity', 'Hardware'],
  },
}, {
  timestamps: true,
});

// Indexes
newsSchema.index({ date: -1 });
newsSchema.index({ category: 1 });
newsSchema.index({ source: 1 });
newsSchema.index({ title: 'text', summary: 'text' });

export default mongoose.model<INews>('News', newsSchema);