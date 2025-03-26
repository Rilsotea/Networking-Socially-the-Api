"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_js_1 = require("./userRoutes.js");
const thoughtRoutes_js_1 = require("./thoughtRoutes.js");
const router = (0, express_1.Router)();
router.use('/user', userRoutes_js_1.userRouter);
router.use('/thought', thoughtRoutes_js_1.thoughtRouter);
exports.default = router;
