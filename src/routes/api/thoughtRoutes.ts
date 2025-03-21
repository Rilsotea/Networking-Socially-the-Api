const router = require('express').Router();
const { getThoughts, createThought, deleteThought } = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').delete(deleteThought);

module.exports = router;
