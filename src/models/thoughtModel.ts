import { Schema, model, Document } from 'mongoose';
import reactionSchema from './reactionModel.js';



interface IThought extends Document {
    thoughtText: string;
    username: string;
    createdAt: Date;  
    reactions: typeof reactionSchema[];
}

const thoughtSchema = new Schema<IThought>({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        getters: true,
    },
    timestamps: true,
    id: false
});

const Thought = model('Thought', thoughtSchema);

export default Thought;