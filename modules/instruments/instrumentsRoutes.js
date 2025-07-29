const express = require('express');
const router = express.Router();
const instrumentsController = require('./instrumentsController');
const { authenticate, authorize } = require('../../middlewares/auth');
const { uploadInstrumentPicture } = require('../../middlewares/multer');

router.get('/get-instruments', authenticate, authorize('instruments_read'), instrumentsController.getAllInstruments);
router.get('/get-instrument/:id', authenticate, authorize('instruments_read'), instrumentsController.getInstrumentById);
router.post('/create-instrument', authenticate, authorize('instruments_create'), uploadInstrumentPicture, instrumentsController.createInstrument);
router.put('/update-instrument/:id', authenticate, authorize('instruments_update'), uploadInstrumentPicture, instrumentsController.updateInstrument);
router.delete('/delete-instrument/:id', authenticate, authorize('instruments_delete'), instrumentsController.deleteInstrument);

module.exports = router;