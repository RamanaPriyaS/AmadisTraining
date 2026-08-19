import { useEffect, useState } from "react";
import api from "../api/client.js";
import { formatCurrency } from "../utils/currency.js";

function BookingCard({ booking, onCancel, cancelling }) {
  const nights = Math.round((new Date(booking.checkOut) - new Date(booking.checkIn)) / 86400000);
  const canCancel = booking.status === "confirmed" && booking.checkOut >= new Date().toISOString().slice(0, 10);

  return (
    <div className="card booking-card">
      <div className="booking-main">
        <div className="booking-top">
          <h3>{booking.room?.hotel?.name}</h3>
          <span className={`pill pill-${booking.status}`}>{booking.status}</span>
        </div>
        <p className="booking-room">{booking.room?.type} · {booking.room?.hotel?.city}</p>
        <p className="booking-dates">
          {booking.checkIn} → {booking.checkOut} · {nights} night{nights !== 1 ? "s" : ""} · {booking.guestCount} guest
          {booking.guestCount !== 1 ? "s" : ""}
        </p>
        {booking.status === "cancelled" && booking.refundAmount != null && (
          <p className="booking-refund">
            Refunded {formatCurrency(booking.refundAmount)} ({booking.refundPercent}%)
          </p>
        )}
      </div>
      <div className="booking-side">
        <div className="booking-price">{formatCurrency(booking.totalPrice)}</div>
        {canCancel && (
          <button className="btn btn-danger btn-sm" disabled={cancelling} onClick={() => onCancel(booking.id)}>
            {cancelling ? "Cancelling…" : "Cancel"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState({ upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);
  const [notice, setNotice] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await api.myBookings();
      setData(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCancel(id) {
    if (!window.confirm("Cancel this booking? Your refund will depend on the cancellation policy.")) return;
    setCancellingId(id);
    setNotice("");
    try {
      const res = await api.cancelBooking(id);
      setNotice(`Booking #${id} cancelled. Refund: ${formatCurrency(res.refund.amount)} (${res.refund.percent}%).`);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setCancellingId(null);
    }
  }

  return (
    <div className="container dashboard-page">
      <h1>My stays</h1>
      <p className="page-sub">Keep track of upcoming trips and look back on past ones.</p>

      {error && <div className="banner banner-error">{error}</div>}
      {notice && <div className="banner banner-success">{notice}</div>}

      {loading ? (
        <div className="empty-state">
          <div className="spinner" style={{ margin: "0 auto" }} />
        </div>
      ) : (
        <>
          <section>
            <h2>Upcoming</h2>
            {data.upcoming.length === 0 ? (
              <div className="empty-state card">No upcoming stays yet — go find your next room.</div>
            ) : (
              <div className="booking-list">
                {data.upcoming.map((b) => (
                  <BookingCard key={b.id} booking={b} onCancel={handleCancel} cancelling={cancellingId === b.id} />
                ))}
              </div>
            )}
          </section>

          <section>
            <h2>Past</h2>
            {data.past.length === 0 ? (
              <div className="empty-state card">No past stays or cancellations yet.</div>
            ) : (
              <div className="booking-list">
                {data.past.map((b) => (
                  <BookingCard key={b.id} booking={b} onCancel={handleCancel} cancelling={cancellingId === b.id} />
                ))}
              </div>
            )}
          </section>
        </>
      )}

      <style>{`
        .dashboard-page { padding: 40px 24px 80px; }
        .page-sub { color: var(--sage); margin-bottom: 32px; }
        .dashboard-page section { margin-bottom: 36px; }
        .booking-list { display: flex; flex-direction: column; gap: 12px; }
        .booking-card { display: flex; justify-content: space-between; gap: 20px; padding: 18px 20px; align-items: center; }
        .booking-top { display: flex; align-items: center; gap: 10px; }
        .booking-top h3 { margin-bottom: 0; }
        .booking-room { color: var(--sage); font-size: 0.85rem; margin: 4px 0; }
        .booking-dates { font-size: 0.85rem; margin: 0; }
        .booking-refund { font-size: 0.8rem; color: var(--success); margin: 6px 0 0; }
        .booking-side { text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 8px; flex-shrink: 0; }
        .booking-price { font-family: var(--font-display); font-size: 1.2rem; color: var(--ink); }
        .empty-state.card { padding: 28px; }
        @media (max-width: 600px) {
          .booking-card { flex-direction: column; align-items: stretch; }
          .booking-side { align-items: stretch; }
        }
      `}</style>
    </div>
  );
}
