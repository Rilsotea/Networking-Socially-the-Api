import { Router } from 'express';
import { getUsers, getSingleUser, createUser, updateUser, deleteUser } from '../../controllers/userController.js';

const router = Router();

router.route('/').get(getUsers).post(createUser);

router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

export default router;