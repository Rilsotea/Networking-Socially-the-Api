import { Schema, Document, model, ObjectId } from 'mongoose';

interface IThought extends Document {
    useerId: ObjectId;
    thoughtText: string;
    thoughtAuthor: string;
    createdAt: Date;
    updatedAt: Date;
}

const thoughtSchema = new Schema<IThought>(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
        trim: true,
      },
      thoughtAuthor: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      timestamps: true,
      toJSON: { getters: true },
      toObject: { getters: true },
    }
  );

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;