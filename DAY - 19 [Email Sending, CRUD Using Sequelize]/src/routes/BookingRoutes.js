const bookingController = require('../controllers/BookingController');

async function bookingRoutes(app) {
    app.get('/',bookingController.getAllBooking);
    app.get('/:id',bookingController.getBookingById);
    app.post('/',bookingController.createBooking);
    app.put('/:id',bookingController.updateBookingStatus);
    app.delete('/:id',bookingController.deleteBooking);
}

module.exports = bookingRoutes;