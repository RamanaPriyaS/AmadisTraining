const bookingService = require('../services/BookingService');

async function createBooking(req,res) {    
    const { customerName, customerEmail, serviceName, appointmentDate, notes } = req.body || {};
    if (!customerName || !customerEmail || !serviceName || !appointmentDate) {
        return res.status(400).send({
            message: 'customerName, customerEmail, serviceName and appointmentDate are required fields',
        });
    }

    const {booking,emailResult} = await bookingService.createBooking({customerName, customerEmail, serviceName, appointmentDate, notes});
    return res.status(201).send({message:'Booking created successfully', 
        date:booking,
        email:emailResult
    });
}

async function getAllBooking(req, res) {
    const bookings = await bookingService.getAllBooking();
    return res.status(200).send({message:'Bookings retrieved successfully',
         data: bookings});
}

async function getBookingById(req, res) {
    const booking= await bookingService.getBookingById(req.params.id);
    if (!booking){
        return res.status(404).send({message:'Booking not found'});
    }
    return res.status(200).send({message:'Booking retrieved successfully', data: booking});
}

async function updateBookingStatus(req, res) {
    const { status } = req.body || {};
    if (!status) {
        return res.status(400).send({message:'status is required'});
    }
    const {booking,emailResult} = await bookingService.updateBooking(req.params.id, status);
    return res.status(200).send({message:'Booking updated successfully', 
        data: booking,
        email:emailResult
    });

}

async function deleteBooking(req, res) {
    await bookingService.deleteBooking(req.params.id);
    return res.status(204).send();
}

module.exports = {
    createBooking,
    getAllBooking,
    getBookingById,
    updateBookingStatus,
    deleteBooking
};