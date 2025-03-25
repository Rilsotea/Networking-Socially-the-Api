import { Router } from 'express';
import { getSingleThought, getThoughts, deleteThought, createThought, updateThought} from '../../controllers/thoughtController.js';

const router = Router();

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

export default router;