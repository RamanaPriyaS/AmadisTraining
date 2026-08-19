import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/client.js";
import { formatCurrencyWhole } from "../utils/currency.js";

export function fallbackImage(seed, w = 900, h = 560) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed || "hotel")}/${w}/${h}`;
}

function todayStr(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export default function HotelList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [form, setForm] = useState({
    city: searchParams.get("city") || "",
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
    guests: searchParams.get("guests") || "",
  });
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  async function runSearch(params) {
    setLoading(true);
    setError("");
    try {
      const res = await api.listHotels(params);
      setHotels(res.hotels);
      setSearched(Boolean(params.checkIn && params.checkOut));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    runSearch(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (form.checkIn && form.checkOut && form.checkOut <= form.checkIn) {
      setError("Check-out date must be after check-in date.");
      return;
    }
    setError("");
    const params = Object.fromEntries(Object.entries(form).filter(([, v]) => v));
    setSearchParams(params);
    runSearch(params);
  }

  function clearFilters() {
    setForm({ city: "", checkIn: "", checkOut: "", guests: "" });
    setSearchParams({});
    runSearch({});
  }

  return (
    <div className="container hotel-list-page">
      <section className="hero">
        <p className="eyebrow">Find your stay</p>
        <h1>A room, held for you — for exactly the nights you need.</h1>
        <p className="hero-sub">
          Search by city and date range. We'll only show rooms with real availability, priced for your dates.
        </p>
      </section>

      <form className="search-bar card" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="city">City or Hotel</label>
          <input
            id="city"
            placeholder="e.g. Goa, Seaside, Mumbai"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="checkIn">Check-in</label>
          <input
            id="checkIn"
            type="date"
            min={todayStr()}
            value={form.checkIn}
            onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="checkOut">Check-out</label>
          <input
            id="checkOut"
            type="date"
            min={form.checkIn || todayStr(1)}
            value={form.checkOut}
            onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
          />
        </div>
        <div className="field guests-field">
          <label htmlFor="guests">Guests</label>
          <input
            id="guests"
            type="number"
            min="1"
            placeholder="2"
            value={form.guests}
            onChange={(e) => setForm({ ...form, guests: e.target.value })}
          />
        </div>
        <button className="btn btn-primary search-btn">Search</button>
        {(form.city || form.checkIn || form.checkOut || form.guests) && (
          <button type="button" className="btn btn-outline btn-sm clear-btn" onClick={clearFilters}>
            Clear
          </button>
        )}
      </form>

      {error && <div className="banner banner-error">{error}</div>}

      {loading ? (
        <div className="empty-state">
          <div className="spinner" style={{ margin: "0 auto 12px" }} />
          Searching stays…
        </div>
      ) : hotels.length === 0 ? (
        <div className="empty-state">
          <h3>No stays match this search</h3>
          <p>Try a different city, wider dates, or fewer guests.</p>
        </div>
      ) : (
        <div className="hotel-grid">
          {hotels.map((hotel) => (
            <Link
              key={hotel.id}
              to={`/hotels/${hotel.id}${form.checkIn && form.checkOut ? `?checkIn=${form.checkIn}&checkOut=${form.checkOut}&guests=${form.guests || ""}` : ""}`}
              className="hotel-card card"
            >
              <div className="hotel-card-image">
                <img
                  src={hotel.imageUrl || fallbackImage(hotel.name)}
                  alt={hotel.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackImage(hotel.id || hotel.name);
                  }}
                />
              </div>
              <div className="hotel-card-top">
                <h3>{hotel.name}</h3>
                {hotel.starRating && <span className="stars">{"★".repeat(hotel.starRating)}</span>}
              </div>
              <p className="hotel-city">{hotel.city}</p>
              <p className="hotel-desc">{hotel.description}</p>
              <div className="amenity-row">
                {(hotel.amenities || []).slice(0, 4).map((a) => (
                  <span key={a} className="amenity-pill">
                    {a.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
              {searched && (
                <div className="room-avail">
                  {hotel.rooms.length} room type{hotel.rooms.length !== 1 ? "s" : ""} available ·{" "}
                  from {formatCurrencyWhole(Math.min(...hotel.rooms.map((r) => r.basePrice)))}/night
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        .hotel-list-page { padding: 40px 24px 64px; }
        .hero { max-width: 640px; margin-bottom: 32px; }
        .eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--brass);
          margin-bottom: 10px;
        }
        .hero h1 { font-size: 2.5rem; margin-bottom: 12px; }
        .hero-sub { color: var(--sage); font-size: 1rem; }

        .search-bar {
          display: flex;
          gap: 16px;
          align-items: flex-end;
          padding: 20px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }
        .search-bar .field { margin-bottom: 0; min-width: 130px; flex: 1; }
        .guests-field { max-width: 100px; flex: 0 0 100px; }
        .search-btn { height: 42px; }
        .clear-btn { height: 42px; }

        .hotel-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        .hotel-card {
          display: block;
          padding: 0 0 22px;
          overflow: hidden;
          color: var(--charcoal);
          transition: box-shadow 0.15s ease, transform 0.15s ease;
        }
        .hotel-card:hover {
          box-shadow: 0 2px 4px rgba(31,58,46,0.08), 0 8px 24px rgba(31,58,46,0.09);
          transform: translateY(-2px);
        }
        .hotel-card-image { width: 100%; height: 170px; background: var(--ivory); }
        .hotel-card-image img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .hotel-card-top,
        .hotel-city,
        .hotel-desc,
        .amenity-row,
        .room-avail { padding-left: 22px; padding-right: 22px; }
        .hotel-card-top { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; margin-top: 16px; }
        .hotel-card-top h3 { margin-bottom: 0; }
        .stars { color: var(--brass); font-size: 0.8rem; white-space: nowrap; }
        .hotel-city { color: var(--sage); font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.04em; margin: 4px 0 10px; }
        .hotel-desc { font-size: 0.88rem; color: var(--charcoal); margin-bottom: 14px; }
        .amenity-row { display: flex; flex-wrap: wrap; gap: 6px; }
        .amenity-pill {
          font-size: 0.7rem;
          background: var(--ivory);
          border: 1px solid var(--line);
          padding: 3px 9px;
          border-radius: 999px;
          color: var(--sage);
          text-transform: capitalize;
        }
        .room-avail {
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px dashed var(--line);
          font-size: 0.82rem;
          color: var(--ink);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
