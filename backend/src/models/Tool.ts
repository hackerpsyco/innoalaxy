import mongoose, { Document, Schema } from 'mongoose';

export interface ITool extends Document {
  name: string;
  description: string;
  category: string;
  features: string[];
  link: string;
  logo: string;
  rating: number;
  tags: string[];
  isFeatured: boolean;
  dateAdded: Date;
  createdAt: Date;
  updatedAt: Date;
}

const toolSchema = new Schema<ITool>({
  name: {
    type: String,
    required: [true, 'Tool name is required'],
    trim: true,
    maxlength: [100, 'Tool name cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Tool description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Image', 'Text', 'Audio', 'Video', 'Code', 'Productivity', 'Design', 'Analytics'],
  },
  features: [{
    type: String,
    trim: true,
  }],
  link: {
    type: String,
    required: [true, 'Tool link is required'],
    validate: {
      validator: function(v: string) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Please provide a valid URL',
    },
  },
  logo: {
    type: String,
    required: [true, 'Logo URL is required'],
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
  },
  tags: [{
    type: String,
    trim: true,
  }],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
toolSchema.index({ category: 1 });
toolSchema.index({ isFeatured: 1 });
toolSchema.index({ rating: -1 });
toolSchema.index({ name: 'text', description: 'text' });

export default mongoose.model<ITool>('Tool', toolSchema);