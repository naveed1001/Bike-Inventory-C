const { validateCreateShipment, validateUpdateShipment } = require('./shipmentValidator');
const { ApiError, ApiResponse } = require('../../utils');
const ShipmentRepository = require('./shipmentRepository');
const { StatusCodes } = require('http-status-codes');

class ShipmentService {
    async getAllShipments() {
        const shipments = await ShipmentRepository.findAllShipments();
        if (!shipments) {
            throw new ApiError('Failed to retrieve shipments', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Shipments retrieved successfully',
            payload: { shipments }
        });
    }

    async getShipmentById(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid shipment ID', StatusCodes.BAD_REQUEST);
        }
        const shipment = await ShipmentRepository.findShipmentById(parsedId);
        if (!shipment) {
            throw new ApiError('Shipment not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Shipment retrieved successfully',
            payload: shipment
        });
    }

    async createShipment(data) {
        const { error } = validateCreateShipment(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { shipping_agent_id, item_id, warehouse_id, destination, status_id, rider_name, rider_number } = data;
        const shipment = await ShipmentRepository.createShipment(shipping_agent_id, item_id, warehouse_id, destination, status_id, rider_name, rider_number);
        if (shipment === 'Shipping agent not found') {
            throw new ApiError('Invalid shipping agent ID', StatusCodes.BAD_REQUEST);
        }
        if (shipment === 'Item not found') {
            throw new ApiError('Invalid item ID', StatusCodes.BAD_REQUEST);
        }
        if (shipment === 'Warehouse not found') {
            throw new ApiError('Invalid warehouse ID', StatusCodes.BAD_REQUEST);
        }
        if (shipment === 'Status not found') {
            throw new ApiError('Invalid status ID', StatusCodes.BAD_REQUEST);
        }
        return new ApiResponse({
            code: StatusCodes.CREATED,
            message: 'Shipment created successfully',
            payload: shipment
        });
    }

    async updateShipment(id, data) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid shipment ID', StatusCodes.BAD_REQUEST);
        }
        const { error } = validateUpdateShipment(data);
        if (error) throw new ApiError(error.details[0].message, StatusCodes.BAD_REQUEST);

        const { shipping_agent_id, item_id, warehouse_id, destination, status_id, rider_name, rider_number } = data;
        const shipment = await ShipmentRepository.updateShipment(parsedId, shipping_agent_id, item_id, warehouse_id, destination, status_id, rider_name, rider_number);
        if (!shipment) {
            throw new ApiError('Shipment not found', StatusCodes.NOT_FOUND);
        }
        if (shipment === 'Shipping agent not found') {
            throw new ApiError('Invalid shipping agent ID', StatusCodes.BAD_REQUEST);
        }
        if (shipment === 'Item not found') {
            throw new ApiError('Invalid item ID', StatusCodes.BAD_REQUEST);
        }
        if (shipment === 'Warehouse not found') {
            throw new ApiError('Invalid warehouse ID', StatusCodes.BAD_REQUEST);
        }
        if (shipment === 'Status not found') {
            throw new ApiError('Invalid status ID', StatusCodes.BAD_REQUEST);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Shipment updated successfully',
            payload: shipment
        });
    }

    async deleteShipment(id) {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
            throw new ApiError('Invalid shipment ID', StatusCodes.BAD_REQUEST);
        }
        const success = await ShipmentRepository.deleteShipment(parsedId);
        if (!success) {
            throw new ApiError('Shipment not found', StatusCodes.NOT_FOUND);
        }
        return new ApiResponse({
            code: StatusCodes.OK,
            message: 'Shipment soft deleted successfully',
            payload: { message: 'Shipment soft deleted successfully' }
        });
    }
}

module.exports = new ShipmentService();