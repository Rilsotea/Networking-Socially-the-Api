import { Schema, model, type Document } from 'mongoose';
import reactionSchema from './reactionModel.js';



interface IThought extends Document {
    thoughtText: string,
    username: string,
    createdAt: Schema.Types.Date,
    reactions: [typeof reactionSchema]
}

const thoughtSchema = new Schema<IThought>({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Thought = model('Thought', thoughtSchema);

export default Thought;