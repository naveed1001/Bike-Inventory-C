const asyncHandler = require("../../utils/asyncHandler");
const InstrumentsService = require('./instrumentsService');

exports.getAllInstruments = asyncHandler(async (req, res) => {
    const response = await InstrumentsService.getAllInstruments();
    res.status(response.code).json(response);
});

exports.getInstrumentById = asyncHandler(async (req, res) => {
    const response = await InstrumentsService.getInstrumentById(req.params.id);
    res.status(response.code).json(response);
});

exports.createInstrument = asyncHandler(async (req, res) => {
    const response = await InstrumentsService.createInstrument(req.body, req.file);
    res.status(response.code).json(response);
});

exports.updateInstrument = asyncHandler(async (req, res) => {
    const response = await InstrumentsService.updateInstrument(req.params.id, req.body, req.file);
    res.status(response.code).json(response);
});

exports.deleteInstrument = asyncHandler(async (req, res) => {
    const response = await InstrumentsService.deleteInstrument(req.params.id);
    res.status(response.code).json(response);
});