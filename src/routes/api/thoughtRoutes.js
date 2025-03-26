"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thoughtRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.thoughtRouter = router;
const thoughtController_js_1 = require("../../controllers/thoughtController.js");
// /api/thoughts
router.route('/').get(thoughtController_js_1.getAllThoughts).post(thoughtController_js_1.createThought);
// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(thoughtController_js_1.getThoughtById).delete(thoughtController_js_1.deleteThought);
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(thoughtController_js_1.addReaction);
// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(thoughtController_js_1.removeReaction);
