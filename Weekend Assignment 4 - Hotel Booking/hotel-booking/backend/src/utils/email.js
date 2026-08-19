import nodemailer from "nodemailer";
import "dotenv/config";
import { formatINR } from "./currency.js";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  return transporter;
}

export async function sendMail({ to, subject, html, text }) {
  const t = getTransporter();
  if (!t) {
    console.log("\n----- [email:not-configured, logging instead] -----");
    console.log(`To: ${to}\nSubject: ${subject}\n${text || html}`);
    console.log("----------------------------------------------------\n");
    return { delivered: false, logged: true };
  }

  try {
    await t.sendMail({
      from: process.env.SMTP_FROM || "Hotel Booking <no-reply@hotelbooking.test>",
      to,
      subject,
      html,
      text,
    });
    return { delivered: true, logged: false };
  } catch (err) {
    console.error("Failed to send email, logging instead:", err.message);
    console.log(`To: ${to}\nSubject: ${subject}\n${text || html}`);
    return { delivered: false, logged: true, error: err.message };
  }
}

export function bookingConfirmationEmail(booking, room, hotel, guest) {
  const subject = `Booking confirmed — ${hotel.name}`;
  const text =
    `Hi ${guest.name},\n\n` +
    `Your booking is confirmed!\n\n` +
    `Hotel: ${hotel.name} (${hotel.city})\n` +
    `Room: ${room.type}\n` +
    `Check-in: ${booking.checkIn}\n` +
    `Check-out: ${booking.checkOut}\n` +
    `Guests: ${booking.guestCount}\n` +
    `Total price: ${formatINR(booking.totalPrice)}\n` +
    `Booking reference: #${booking.id}\n\n` +
    `We look forward to hosting you.`;
  const html = text.replace(/\n/g, "<br/>");
  return { subject, text, html };
}

export function bookingCancellationEmail(booking, room, hotel, guest, refund) {
  const subject = `Booking cancelled — ${hotel.name}`;
  const text =
    `Hi ${guest.name},\n\n` +
    `Your booking #${booking.id} at ${hotel.name} has been cancelled.\n` +
    `Refund: ${formatINR(refund.amount)} (${refund.percent}% of ${formatINR(booking.totalPrice)})\n\n` +
    `If you have questions about your refund, reply to this email.`;
  const html = text.replace(/\n/g, "<br/>");
  return { subject, text, html };
}
