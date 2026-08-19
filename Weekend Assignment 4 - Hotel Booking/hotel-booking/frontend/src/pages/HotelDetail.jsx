import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";
import { fallbackImage } from "./HotelList.jsx";
import { formatCurrency, formatCurrencyWhole } from "../utils/currency.js";

function todayStr(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export default function HotelDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [dates, setDates] = useState({
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
    guests: searchParams.get("guests") || "1",
  });

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [quote, setQuote] = useState(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [bookingState, setBookingState] = useState({ submitting: false, error: "", success: null });

  async function loadHotel(range) {
    setLoading(true);
    setError("");
    try {
      const res = await api.getHotel(id, range);
      setHotel(res.hotel);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHotel(dates.checkIn && dates.checkOut ? { checkIn: dates.checkIn, checkOut: dates.checkOut } : {});
  }, [id]);

  function handleDateSearch(e) {
    e.preventDefault();
    if (dates.checkOut <= dates.checkIn) {
      setError("Check-out date must be after check-in date.");
      return;
    }
    setError("");
    setSelectedRoom(null);
    setQuote(null);
    setSearchParams({ checkIn: dates.checkIn, checkOut: dates.checkOut, guests: dates.guests });
    loadHotel({ checkIn: dates.checkIn, checkOut: dates.checkOut });
  }

  async function selectRoom(room) {
    setSelectedRoom(room);
    setQuote(null);
    setBookingState({ submitting: false, error: "", success: null });
    if (!dates.checkIn || !dates.checkOut) return;
    setQuoteLoading(true);
    try {
      const res = await api.getRoomPriceQuote(room.id, dates.checkIn, dates.checkOut);
      setQuote(res);
    } catch (err) {
      setBookingState((s) => ({ ...s, error: err.message }));
    } finally {
      setQuoteLoading(false);
    }
  }

  async function handleBook(e) {
    e.preventDefault();
    if (!user) {
      navigate("/login", { state: { from: `/hotels/${id}?checkIn=${dates.checkIn}&checkOut=${dates.checkOut}` } });
      return;
    }
    if (user.role !== "guest") {
      setBookingState({ submitting: false, error: "Only guest accounts can book rooms.", success: null });
      return;
    }
    setBookingState({ submitting: true, error: "", success: null });
    try {
      const res = await api.createBooking({
        roomId: selectedRoom.id,
        checkIn: dates.checkIn,
        checkOut: dates.checkOut,
        guestCount: Number(dates.guests) || 1,
      });
      setBookingState({ submitting: false, error: "", success: res.booking });
      loadHotel({ checkIn: dates.checkIn, checkOut: dates.checkOut }); // refresh availability
    } catch (err) {
      setBookingState({ submitting: false, error: err.message, success: null });
    }
  }

  if (loading) {
    return (
      <div className="empty-state">
        <div className="spinner" style={{ margin: "0 auto" }} />
      </div>
    );
  }
  if (error && !hotel) {
    return (
      <div className="container">
        <div className="banner banner-error">{error}</div>
      </div>
    );
  }
  if (!hotel) return null;

  const hasDates = Boolean(dates.checkIn && dates.checkOut);

  return (
    <div className="container hotel-detail-page">
      <div className="hero-image">
        <img
          src={hotel.imageUrl || fallbackImage(hotel.name)}
          alt={hotel.name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage(hotel.id || hotel.name);
          }}
        />
      </div>
      <div className="detail-header">
        <div>
          <p className="eyebrow">{hotel.city}</p>
          <h1>{hotel.name}</h1>
          <p className="hotel-desc">{hotel.description}</p>
          <div className="amenity-row">
            {(hotel.amenities || []).map((a) => (
              <span key={a} className="amenity-pill">
                {a.replace(/-/g, " ")}
              </span>
            ))}
          </div>
        </div>
        {hotel.starRating && <span className="stars-large">{"★".repeat(hotel.starRating)}</span>}
      </div>

      <form className="search-bar card" onSubmit={handleDateSearch}>
        <div className="field">
          <label htmlFor="checkIn">Check-in</label>
          <input
            id="checkIn"
            type="date"
            required
            min={todayStr()}
            value={dates.checkIn}
            onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="checkOut">Check-out</label>
          <input
            id="checkOut"
            type="date"
            required
            min={dates.checkIn || todayStr(1)}
            value={dates.checkOut}
            onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
          />
        </div>
        <div className="field guests-field">
          <label htmlFor="guests">Guests</label>
          <input
            id="guests"
            type="number"
            min="1"
            value={dates.guests}
            onChange={(e) => setDates({ ...dates, guests: e.target.value })}
          />
        </div>
        <button className="btn btn-primary">Check availability</button>
      </form>

      {error && <div className="banner banner-error">{error}</div>}

      <h2 className="rooms-heading">Room types</h2>
      <div className="rooms-list">
        {hotel.rooms.map((room) => {
          const isFull = hasDates && room.availableUnits === 0;
          const isSelected = selectedRoom?.id === room.id;
          return (
            <div key={room.id} className={`room-card card ${isSelected ? "selected" : ""}`}>
              <div className="room-thumb">
                <img
                  src={room.imageUrl || fallbackImage(`${hotel.name}-${room.type}`, 400, 300)}
                  alt={room.type}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackImage(room.id || room.type, 400, 300);
                  }}
                />
              </div>
              <div className="room-main">
                <h3>{room.type}</h3>
                <p className="room-desc">{room.description}</p>
                <p className="room-meta">Sleeps up to {room.capacity} guests</p>
                {hasDates && (
                  <p className={`room-avail-tag ${isFull ? "full" : "open"}`}>
                    {isFull ? "Fully booked for these dates" : `${room.availableUnits} room(s) left for these dates`}
                  </p>
                )}
              </div>
              <div className="room-side">
                <div className="room-price">
                  {formatCurrencyWhole(room.basePrice)}
                  <span>/night base</span>
                </div>
                <button
                  className="btn btn-brass btn-sm"
                  disabled={!hasDates || isFull}
                  onClick={() => selectRoom(room)}
                >
                  {hasDates ? (isFull ? "Unavailable" : "Select") : "Pick dates first"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedRoom && (
        <div className="booking-panel card">
          <h3>
            Confirm your stay — {selectedRoom.type}
          </h3>
          {quoteLoading ? (
            <div className="empty-state" style={{ padding: 20 }}>
              <div className="spinner" style={{ margin: "0 auto" }} />
            </div>
          ) : quote ? (
            <>
              <div className="quote-lines">
                {quote.nights.map((n) => (
                  <div key={n.date} className="quote-line">
                    <span>{n.date}</span>
                    <span>
                      {formatCurrency(n.price)}
                      {(n.seasonMultiplier > 1 || n.occupancyMultiplier > 1) && (
                        <em className="quote-note">
                          {n.seasonMultiplier > 1 ? " · peak season" : ""}
                          {n.occupancyMultiplier > 1 ? " · high demand" : ""}
                        </em>
                      )}
                    </span>
                  </div>
                ))}
              </div>
              <div className="quote-total">
                <span>Total for {quote.nightCount} night(s)</span>
                <strong>{formatCurrency(quote.total)}</strong>
              </div>

              {bookingState.error && <div className="banner banner-error">{bookingState.error}</div>}
              {bookingState.success ? (
                <div className="banner banner-success">
                  Booking confirmed! Reference #{bookingState.success.id}. A confirmation has been sent to your email.
                </div>
              ) : (
                <form onSubmit={handleBook}>
                  <button className="btn btn-primary btn-block" disabled={bookingState.submitting}>
                    {bookingState.submitting ? "Booking…" : `Book now — ${formatCurrency(quote.total)}`}
                  </button>
                </form>
              )}
            </>
          ) : null}
        </div>
      )}

      <style>{`
        .hotel-detail-page { padding: 40px 24px 80px; }
        .hero-image { width: 100%; height: 320px; border-radius: var(--radius); overflow: hidden; margin-bottom: 24px; background: var(--ivory); }
        .hero-image img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .detail-header { display: flex; justify-content: space-between; gap: 20px; margin-bottom: 28px; }
        .eyebrow { text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.72rem; font-weight: 700; color: var(--brass); }
        .hotel-desc { color: var(--charcoal); max-width: 620px; margin: 10px 0 14px; }
        .amenity-row { display: flex; flex-wrap: wrap; gap: 6px; }
        .amenity-pill { font-size: 0.72rem; background: var(--ivory); border: 1px solid var(--line); padding: 3px 10px; border-radius: 999px; color: var(--sage); text-transform: capitalize; }
        .stars-large { color: var(--brass); font-size: 1.1rem; white-space: nowrap; }

        .search-bar { display: flex; gap: 16px; align-items: flex-end; padding: 18px; margin-bottom: 28px; flex-wrap: wrap; }
        .search-bar .field { margin-bottom: 0; min-width: 140px; flex: 1; }
        .guests-field { max-width: 100px; flex: 0 0 100px; }

        .rooms-heading { margin-bottom: 16px; }
        .rooms-list { display: flex; flex-direction: column; gap: 14px; margin-bottom: 32px; }
        .room-card { display: flex; justify-content: space-between; gap: 20px; padding: 16px 22px; align-items: center; }
        .room-card.selected { border-color: var(--brass); box-shadow: 0 0 0 2px rgba(176,141,87,0.25); }
        .room-thumb { width: 96px; height: 72px; flex-shrink: 0; border-radius: var(--radius); overflow: hidden; background: var(--ivory); }
        .room-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .room-main h3 { margin-bottom: 4px; }
        .room-desc { font-size: 0.86rem; color: var(--charcoal); margin-bottom: 4px; }
        .room-meta { font-size: 0.8rem; color: var(--sage); margin-bottom: 4px; }
        .room-avail-tag { font-size: 0.78rem; font-weight: 600; margin: 0; }
        .room-avail-tag.open { color: var(--success); }
        .room-avail-tag.full { color: var(--danger); }
        .room-side { text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 10px; flex-shrink: 0; }
        .room-price { font-family: var(--font-display); font-size: 1.3rem; color: var(--ink); }
        .room-price span { font-size: 0.7rem; color: var(--sage); font-family: var(--font-body); display: block; }

        .booking-panel { padding: 26px; max-width: 480px; }
        .quote-lines { margin: 12px 0; }
        .quote-line { display: flex; justify-content: space-between; font-size: 0.85rem; padding: 6px 0; border-bottom: 1px dashed var(--line); }
        .quote-note { color: var(--brass); font-style: normal; font-size: 0.72rem; }
        .quote-total { display: flex; justify-content: space-between; align-items: baseline; padding: 12px 0 18px; font-family: var(--font-display); }
        .quote-total strong { font-size: 1.4rem; color: var(--ink); }

        @media (max-width: 640px) {
          .room-card { flex-direction: column; align-items: stretch; }
          .room-thumb { width: 100%; height: 140px; }
          .room-side { align-items: stretch; }
        }
      `}</style>
    </div>
  );
}
