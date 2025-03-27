import express from 'express';
import {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} from '../../controllers/userController.js';

const router = express.Router();

// Route to get all users
router.route('/')
    .get(getUsers)        // GET /api/users
    .post(createUser);    // POST /api/users

// Route to get, update, and delete a single user by ID
router.route('/:userId')
    .get(getSingleUser)   // GET /api/users/:userId
    .put(updateUser)      // PUT /api/users/:userId
    .delete(deleteUser);  // DELETE /api/users/:userId

export default router;