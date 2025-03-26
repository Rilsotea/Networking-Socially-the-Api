"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.userRouter = router;
const userController_js_1 = require("../../controllers/userController.js");
// /api/users
router.route('/').get(userController_js_1.getUsers).post(userController_js_1.createUser);
// /api/users/:userId
router
    .route('/:userId')
    .get(userController_js_1.getSingleUser)
    .put(userController_js_1.updateUser)
    .delete(userController_js_1.deleteUser);
