const Booking= require('../models/Booking');
const {sendBookingConfirmationEmail, sendBookingCancellationEmail} = require('./emailService');

async function createBooking({customerName, customerEmail, serviceName, appointmentDate, notes}) {
    const date = new Date(appointmentDate);
    if (isNaN(date.getTime())) {
        const err =new Error('appointment Date must be a valid date');
        err.statusCode = 400;
        throw err;
    }
    if (date < new Date()) {
        const err =new Error('appointment Date must be in the future');
        err.statusCode = 400;
        throw err;
    }
    const booking = await Booking.create({
        customerName,
        customerEmail,
        serviceName,
        appointmentDate: date,
        notes,
        status: 'pending',
    });

    const emailResult=await sendBookingConfirmationEmail(booking);
    return {booking,emailResult};
}
async function getAllBooking(){
    return Booking.findAll({order:[['appointmentDate','ASC']]});
}
async function getBookingById(id){
    return Booking.findByPk(id);
}

async function updateBooking(id, status) {
    const booking =await Booking.findByPk(id);
    if (!booking){
        const err=new Error('Booking not found');
        err.statusCode=404;
        throw err;
    }
    await booking.update({status});
    let emailResult=null;
    if (status === 'cancelled') {
       emailResult=await sendBookingCancellationEmail(booking);
    }
    return {booking,emailResult};
}

async function deleteBooking(id) {
    const booking =await Booking.findByPk(id);
    if (!booking){
        const err=new Error('Booking not found');
        err.statusCode=404;
        throw err;
    }
    await booking.destroy();
}
module.exports = {
    createBooking,
    getAllBooking,
    getBookingById,
    updateBooking,
    deleteBooking
};
