import { Router } from 'express';
const router = Router();

import {
  getAllThoughts,
  getThoughtById,
  createThought,
  deleteThought,
  addReaction,
  removeReaction,
} from '../../controllers/thoughtController.js';

router.route('/')
    .get(getAllThoughts)        // GET /api/thoughts
    .post(createThought);       // POST /api/thoughts

// Route to get, delete a single thought by ID
router.route('/:thoughtId')
    .get(getThoughtById)        // GET /api/thoughts/:thoughtId
    .delete(deleteThought);      // DELETE /api/thoughts/:thoughtId

// Route to add and remove reactions to a thought by ID
router.route('/:thoughtId/reactions')
    .post(addReaction);          // POST /api/thoughts/:thoughtId/reactions

// Route to remove a specific reaction from a thought
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);     // DELETE /api/thoughts/:thoughtId/reactions/:reactionId

export default router;