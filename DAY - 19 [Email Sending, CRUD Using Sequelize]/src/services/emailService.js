const nodemailer = require('nodemailer');

function isEmailConfigured(){
    const user=process.env.SMTP_USER?.trim();
    const pass=process.env.SMTP_PASS?.trim();
    return !!user && !!pass;
}

function createTransporter() {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,    
            pass: process.env.SMTP_PASS,
        },
    });
}

async function sendBookingConfirmationEmail(booking) {
    if (!isEmailConfigured()) {
        console.log('Email configuration is missing. Skipping email sending.');
        return {skipped: true, message:'Email configuration is missing. Skipping email sending.'};
    }
    try{
        const transporter = createTransporter();
        const formattedDate =  new Date(booking.appointmentDate).toLocaleString();
        const info = await transporter.sendMail({
            from:process.env.SMTP_FROM || "Booking Service",
            to: booking.customerEmail,
            subject: `Booking Confirmed: ${booking.serviceName}`,
            text: `Hi ${booking.customerName}, your ${booking.serviceName} a
            ppointment is booked for ${formattedDate}. Status: ${booking.status}.`,
            html: `<p>Hi ${booking.customerName},</p>
                   <p>Your <strong>${booking.serviceName}</strong> appointment is booked for <strong>${formattedDate}</strong>.</p>
                   <p>Status: <strong>${booking.status}</strong>.</p>`, 
        });
        return {skipped: false,sent:true, message: `Email sent: ${info.messageId}`}; 
    }
    catch (error) {
        console.error('[Email failed]:', error.message);
        return {skipped: false,sent:false, message: `Error sending email: ${error.message}`};
    }
    
}

async function sendBookingCancellationEmail(booking) {
    if (!isEmailConfigured()) {
        console.log('Email configuration is missing. Skipping email sending.');
        return {skipped: true, message:'Email configuration is missing. Skipping email sending.'};
    }
    try{
        const transporter = createTransporter();
        const info = await transporter.sendMail({
            from:process.env.SMTP_FROM || "Booking Service",
            to: booking.customerEmail,
            subject: `Booking Cancelled: ${booking.serviceName}`,
            text: `Hi ${booking.customerName}, your ${booking.serviceName} appointment has been cancelled.`,
            html: `<p>Hi ${booking.customerName},</p>
                   <p>Your <strong>${booking.serviceName}</strong> appointment has been cancelled.</p>`, 
        });
        return {skipped: false,sent:true, message: `Email sent: ${info.messageId}`}; 
    }
    catch (error) {
        console.error('[Email failed]:', error.message);
        return {skipped: false,sent:false, message: `Error sending email: ${error.message}`};
    }
}

module.exports = {
    sendBookingConfirmationEmail,
    sendBookingCancellationEmail
};