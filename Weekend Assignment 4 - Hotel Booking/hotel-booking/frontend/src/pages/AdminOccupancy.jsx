import { useEffect, useState, useRef } from "react";
import api from "../api/client.js";
import { fallbackImage } from "./HotelList.jsx";
import { formatCurrency, formatCurrencyWhole } from "../utils/currency.js";

function ImageInput({ label, value, onChange, required = true, hint }) {
  const fileInputRef = useRef(null);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width / height > MAX_WIDTH / MAX_HEIGHT) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          } else {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);
        onChange(compressedDataUrl);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="field">
      <label>{label} {required && "*"}</label>
      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "6px" }}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() => fileInputRef.current?.click()}
        >
          📁 Choose Image File
        </button>
        <span style={{ fontSize: "12px", opacity: 0.7 }}>or paste image URL below</span>
      </div>
      <input
        type="text"
        required={required}
        placeholder="https://… or choose image file above"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <p className="field-hint">{hint}</p>}
      {value && (
        <div className="img-preview" style={{ marginTop: "8px", height: "120px", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border, #ccc)", position: "relative" }}>
          <img
            src={value}
            alt="Preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => onChange("")}
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              background: "rgba(0,0,0,0.65)",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "2px 8px",
              cursor: "pointer",
              fontSize: "12px"
            }}
          >
            ✕ Remove photo
          </button>
        </div>
      )}
    </div>
  );
}

function todayStr(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

function DashboardStats({ stats, loading }) {
  if (loading) {
    return (
      <div className="empty-state">
        <div className="spinner" style={{ margin: "0 auto" }} />
      </div>
    );
  }
  if (!stats) return null;
  const cards = [
    { label: "Properties", value: `${stats.activeHotels}/${stats.totalHotels}`, hint: "active / total" },
    { label: "Room types", value: stats.totalRoomTypes },
    { label: "Total bookings", value: stats.totalBookings },
    { label: "Upcoming check-ins", value: stats.upcomingCheckIns },
    { label: "Revenue (confirmed)", value: formatCurrency(stats.totalRevenue) },
  ];
  return (
    <div className="stat-grid">
      {cards.map((c) => (
        <div key={c.label} className="card stat-card">
          <div className="stat-value">{c.value}</div>
          <div className="stat-label">{c.label}</div>
          {c.hint && <div className="stat-hint">{c.hint}</div>}
        </div>
      ))}
    </div>
  );
}

function NewHotelForm({ onCreated }) {
  const [form, setForm] = useState({ name: "", city: "", description: "", address: "", starRating: "", imageUrl: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await api.createHotel({
        ...form,
        starRating: form.starRating ? Number(form.starRating) : undefined,
        imageUrl: form.imageUrl || undefined,
        amenities: [],
      });
      setForm({ name: "", city: "", description: "", address: "", starRating: "", imageUrl: "" });
      setOpen(false);
      onCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <button className="btn btn-outline btn-sm" onClick={() => setOpen(true)}>
        + Add a hotel
      </button>
    );
  }

  return (
    <form className="card inline-form" onSubmit={handleSubmit}>
      <h3>New hotel</h3>
      {error && <div className="banner banner-error">{error}</div>}
      <div className="field-row">
        <div className="field">
          <label>Name</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="field">
          <label>City</label>
          <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        </div>
      </div>
      <div className="field">
        <label>Description</label>
        <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>
      <div className="field-row">
        <div className="field">
          <label>Address</label>
          <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </div>
        <div className="field">
          <label>Star rating</label>
          <input type="number" min="1" max="5" value={form.starRating} onChange={(e) => setForm({ ...form, starRating: e.target.value })} />
        </div>
      </div>
      <ImageInput
        label="Cover photo"
        value={form.imageUrl}
        onChange={(val) => setForm({ ...form, imageUrl: val })}
        required
        hint="Upload an image file from your computer or paste a direct web image link."
      />
      <div className="form-actions">
        <button type="button" className="btn btn-outline btn-sm" onClick={() => setOpen(false)}>
          Cancel
        </button>
        <button className="btn btn-primary btn-sm" disabled={submitting}>
          {submitting ? "Creating…" : "Create hotel"}
        </button>
      </div>
    </form>
  );
}

function EditHotelForm({ hotel, onSaved, onClose }) {
  const [form, setForm] = useState({
    name: hotel.name || "",
    city: hotel.city || "",
    description: hotel.description || "",
    address: hotel.address || "",
    starRating: hotel.starRating || "",
    imageUrl: hotel.imageUrl || "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await api.updateHotel(hotel.id, {
        ...form,
        starRating: form.starRating ? Number(form.starRating) : null,
        imageUrl: form.imageUrl || null,
      });
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="card inline-form" onSubmit={handleSubmit}>
      <h3>Edit hotel</h3>
      {error && <div className="banner banner-error">{error}</div>}
      <div className="field-row">
        <div className="field">
          <label>Name</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="field">
          <label>City</label>
          <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
        </div>
      </div>
      <div className="field">
        <label>Description</label>
        <textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>
      <div className="field-row">
        <div className="field">
          <label>Address</label>
          <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </div>
        <div className="field">
          <label>Star rating</label>
          <input type="number" min="1" max="5" value={form.starRating} onChange={(e) => setForm({ ...form, starRating: e.target.value })} />
        </div>
      </div>
      <ImageInput
        label="Cover photo"
        value={form.imageUrl}
        onChange={(val) => setForm({ ...form, imageUrl: val })}
        required
      />
      <div className="form-actions">
        <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn-primary btn-sm" disabled={submitting}>
          {submitting ? "Saving…" : "Save changes"}
        </button>
      </div>
    </form>
  );
}

function NewRoomForm({ hotelId, onCreated }) {
  const [form, setForm] = useState({ type: "", basePrice: "", capacity: "2", quantity: "1", description: "", imageUrl: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await api.createRoom(hotelId, {
        type: form.type,
        basePrice: Number(form.basePrice),
        capacity: Number(form.capacity),
        quantity: Number(form.quantity),
        description: form.description,
        imageUrl: form.imageUrl || undefined,
      });
      setForm({ type: "", basePrice: "", capacity: "2", quantity: "1", description: "", imageUrl: "" });
      setOpen(false);
      onCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <button className="btn btn-outline btn-sm" onClick={() => setOpen(true)}>
        + Add room type
      </button>
    );
  }

  return (
    <form className="inline-form" onSubmit={handleSubmit}>
      {error && <div className="banner banner-error">{error}</div>}
      <div className="field-row">
        <div className="field">
          <label>Room type</label>
          <input required value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
        </div>
        <div className="field">
          <label>Base price/night (₹)</label>
          <input type="number" min="0.01" step="0.01" required value={form.basePrice} onChange={(e) => setForm({ ...form, basePrice: e.target.value })} />
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label>Capacity</label>
          <input type="number" min="1" required value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
        </div>
        <div className="field">
          <label>Quantity</label>
          <input type="number" min="1" required value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
        </div>
      </div>
      <ImageInput
        label="Room photo"
        value={form.imageUrl}
        onChange={(val) => setForm({ ...form, imageUrl: val })}
        required
        hint="Upload an image file from your computer or paste a direct web image link."
      />
      <div className="form-actions">
        <button type="button" className="btn btn-outline btn-sm" onClick={() => setOpen(false)}>
          Cancel
        </button>
        <button className="btn btn-primary btn-sm" disabled={submitting}>
          {submitting ? "Adding…" : "Add room type"}
        </button>
      </div>
    </form>
  );
}

function EditRoomForm({ hotelId, room, onSaved, onClose }) {
  const [form, setForm] = useState({
    type: room.type || "",
    basePrice: room.basePrice ?? "",
    capacity: room.capacity ?? "",
    quantity: room.quantity ?? "",
    description: room.description || "",
    imageUrl: room.imageUrl || "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await api.updateRoom(hotelId, room.id, {
        type: form.type,
        basePrice: Number(form.basePrice),
        capacity: Number(form.capacity),
        quantity: Number(form.quantity),
        description: form.description,
        imageUrl: form.imageUrl || null,
      });
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="inline-form" onSubmit={handleSubmit}>
      {error && <div className="banner banner-error">{error}</div>}
      <div className="field-row">
        <div className="field">
          <label>Room type</label>
          <input required value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
        </div>
        <div className="field">
          <label>Base price/night (₹)</label>
          <input type="number" min="0.01" step="0.01" required value={form.basePrice} onChange={(e) => setForm({ ...form, basePrice: e.target.value })} />
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label>Capacity</label>
          <input type="number" min="1" required value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
        </div>
        <div className="field">
          <label>Quantity</label>
          <input type="number" min="1" required value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
        </div>
      </div>
      <ImageInput
        label="Room photo"
        value={form.imageUrl}
        onChange={(val) => setForm({ ...form, imageUrl: val })}
        required
      />
      <div className="form-actions">
        <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn-primary btn-sm" disabled={submitting}>
          {submitting ? "Saving…" : "Save room"}
        </button>
      </div>
    </form>
  );
}

function HotelBookingsPanel({ hotel }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [cancellingId, setCancellingId] = useState(null);
  const [notice, setNotice] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await api.hotelBookings(hotel.id, statusFilter || undefined);
      setBookings(res.bookings);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotel.id, statusFilter]);

  async function handleCancel(id) {
    if (!window.confirm("Cancel this guest's booking? This can't be undone.")) return;
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
    <div className="bookings-panel">
      <div className="bookings-panel-head">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All bookings</option>
          <option value="confirmed">Confirmed only</option>
          <option value="cancelled">Cancelled only</option>
        </select>
      </div>
      {error && <div className="banner banner-error">{error}</div>}
      {notice && <div className="banner banner-success">{notice}</div>}
      {loading ? (
        <div className="empty-state" style={{ padding: 20 }}>
          <div className="spinner" style={{ margin: "0 auto" }} />
        </div>
      ) : bookings.length === 0 ? (
        <p className="no-rooms">No bookings for this filter yet.</p>
      ) : (
        <div className="booking-rows">
          {bookings.map((b) => (
            <div key={b.id} className="booking-row">
              <div className="booking-row-main">
                <strong>{b.guest?.name}</strong>
                <span className="booking-row-email">{b.guest?.email}</span>
                <span>{b.room?.type}</span>
                <span>{b.checkIn} → {b.checkOut}</span>
                <span>{formatCurrency(b.totalPrice)}</span>
                <span className={`pill pill-${b.status}`}>{b.status}</span>
              </div>
              {b.status === "confirmed" && (
                <button
                  className="btn btn-danger btn-sm"
                  disabled={cancellingId === b.id}
                  onClick={() => handleCancel(b.id)}
                >
                  {cancellingId === b.id ? "Cancelling…" : "Cancel"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminOccupancy() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingHotelId, setEditingHotelId] = useState(null);
  const [editingRoom, setEditingRoom] = useState(null); // { hotelId, roomId }
  const [toggling, setToggling] = useState(null);

  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [range, setRange] = useState({ startDate: todayStr(), endDate: todayStr(7) });
  const [occupancy, setOccupancy] = useState(null);
  const [occError, setOccError] = useState("");
  const [occLoading, setOccLoading] = useState(false);

  async function loadStats() {
    setStatsLoading(true);
    try {
      const res = await api.dashboardSummary();
      setStats(res);
    } catch {
      // Non-critical — the rest of the page still works without it.
    } finally {
      setStatsLoading(false);
    }
  }

  async function loadHotels() {
    setLoading(true);
    setError("");
    try {
      const res = await api.myHotels();
      setHotels(res.hotels);
      if (!selectedHotelId && res.hotels.length > 0) setSelectedHotelId(String(res.hotels[0].id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHotels();
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadOccupancy() {
    if (!selectedHotelId) return;
    setOccLoading(true);
    setOccError("");
    try {
      const res = await api.occupancy(selectedHotelId, range.startDate, range.endDate);
      setOccupancy(res);
    } catch (err) {
      setOccError(err.message);
    } finally {
      setOccLoading(false);
    }
  }

  useEffect(() => {
    if (selectedHotelId) loadOccupancy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHotelId]);

  async function handleToggleActive(hotel) {
    setToggling(hotel.id);
    try {
      await api.setHotelActive(hotel.id, !hotel.isActive);
      await loadHotels();
    } catch (err) {
      setError(err.message);
    } finally {
      setToggling(null);
    }
  }

  async function handleDeleteRoom(hotelId, room) {
    if (!window.confirm(`Delete room type "${room.type}"? This can't be undone.`)) return;
    try {
      await api.deleteRoom(hotelId, room.id);
      await loadHotels();
    } catch (err) {
      setError(err.message);
    }
  }

  function rateColor(rate) {
    if (rate >= 80) return "rate-high";
    if (rate >= 40) return "rate-mid";
    return "rate-low";
  }

  const selectedHotel = hotels.find((h) => String(h.id) === String(selectedHotelId));

  return (
    <div className="container admin-page">
      <h1>Hotel admin</h1>
      <p className="page-sub">Manage your properties, rooms, guest bookings, and occupancy.</p>

      {error && <div className="banner banner-error">{error}</div>}

      <section>
        <DashboardStats stats={stats} loading={statsLoading} />
      </section>

      <section>
        <div className="section-head">
          <h2>Your hotels</h2>
          <NewHotelForm onCreated={() => { loadHotels(); loadStats(); }} />
        </div>

        {loading ? (
          <div className="empty-state">
            <div className="spinner" style={{ margin: "0 auto" }} />
          </div>
        ) : hotels.length === 0 ? (
          <div className="empty-state card">You haven't added a hotel yet.</div>
        ) : (
          <div className="hotels-admin-list">
            {hotels.map((hotel) => (
              <div key={hotel.id} className={`card hotel-admin-card ${!hotel.isActive ? "inactive" : ""}`}>
                <div className="hotel-admin-top">
                  <div className="hotel-admin-thumb">
                    <img
                      src={hotel.imageUrl || fallbackImage(hotel.name)}
                      alt={hotel.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackImage(hotel.id || hotel.name);
                      }}
                    />
                  </div>
                  <div className="hotel-admin-title">
                    <h3>{hotel.name}</h3>
                    <span className="hotel-admin-city">{hotel.city}</span>
                    {!hotel.isActive && <span className="pill pill-cancelled">hidden from search</span>}
                  </div>
                  <div className="hotel-admin-actions">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setEditingHotelId(editingHotelId === hotel.id ? null : hotel.id)}
                    >
                      {editingHotelId === hotel.id ? "Close" : "Edit"}
                    </button>
                    <button
                      className={`btn btn-sm ${hotel.isActive ? "btn-outline" : "btn-primary"}`}
                      disabled={toggling === hotel.id}
                      onClick={() => handleToggleActive(hotel)}
                    >
                      {toggling === hotel.id ? "Working…" : hotel.isActive ? "Deactivate" : "Reactivate"}
                    </button>
                  </div>
                </div>

                {editingHotelId === hotel.id && (
                  <EditHotelForm
                    hotel={hotel}
                    onSaved={() => { setEditingHotelId(null); loadHotels(); }}
                    onClose={() => setEditingHotelId(null)}
                  />
                )}

                <div className="room-types">
                  {hotel.rooms.length === 0 ? (
                    <p className="no-rooms">No room types yet.</p>
                  ) : (
                    hotel.rooms.map((r) =>
                      editingRoom?.hotelId === hotel.id && editingRoom?.roomId === r.id ? (
                        <EditRoomForm
                          key={r.id}
                          hotelId={hotel.id}
                          room={r}
                          onSaved={() => { setEditingRoom(null); loadHotels(); }}
                          onClose={() => setEditingRoom(null)}
                        />
                      ) : (
                        <div key={r.id} className="room-type-row">
                          <span>{r.type}</span>
                          <span>{formatCurrencyWhole(r.basePrice)}/night</span>
                          <span>{r.quantity} unit(s)</span>
                          <span>sleeps {r.capacity}</span>
                          <span className="room-type-actions">
                            <button className="btn-link" onClick={() => setEditingRoom({ hotelId: hotel.id, roomId: r.id })}>
                              Edit
                            </button>
                            <button className="btn-link btn-link-danger" onClick={() => handleDeleteRoom(hotel.id, r)}>
                              Delete
                            </button>
                          </span>
                        </div>
                      )
                    )
                  )}
                </div>
                <NewRoomForm hotelId={hotel.id} onCreated={loadHotels} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Bookings</h2>
        <div className="card occupancy-controls">
          <div className="field">
            <label>Hotel</label>
            <select value={selectedHotelId} onChange={(e) => setSelectedHotelId(e.target.value)}>
              {hotels.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {selectedHotel && <HotelBookingsPanel key={selectedHotel.id} hotel={selectedHotel} />}
      </section>

      <section>
        <h2>Daily occupancy</h2>
        <div className="card occupancy-controls">
          <div className="field">
            <label>Hotel</label>
            <select value={selectedHotelId} onChange={(e) => setSelectedHotelId(e.target.value)}>
              {hotels.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Start date</label>
            <input type="date" value={range.startDate} onChange={(e) => setRange({ ...range, startDate: e.target.value })} />
          </div>
          <div className="field">
            <label>End date</label>
            <input type="date" value={range.endDate} onChange={(e) => setRange({ ...range, endDate: e.target.value })} />
          </div>
          <button className="btn btn-primary btn-sm" onClick={loadOccupancy} disabled={occLoading}>
            {occLoading ? "Loading…" : "Refresh"}
          </button>
        </div>

        {occError && <div className="banner banner-error">{occError}</div>}

        {occupancy && (
          <div className="card occupancy-table-wrap">
            <table className="occupancy-table">
              <thead>
                <tr>
                  <th>Date</th>
                  {occupancy.days[0]?.byRoomType.map((rt) => (
                    <th key={rt.roomId}>{rt.roomType}</th>
                  ))}
                  <th>Hotel total</th>
                </tr>
              </thead>
              <tbody>
                {occupancy.days.map((day) => (
                  <tr key={day.date}>
                    <td className="date-cell">{day.date}</td>
                    {day.byRoomType.map((rt) => (
                      <td key={rt.roomId}>
                        <span className={`rate-pill ${rateColor(rt.occupancyRate)}`}>
                          {rt.booked}/{rt.total} · {rt.occupancyRate}%
                        </span>
                      </td>
                    ))}
                    <td>
                      <span className={`rate-pill ${rateColor(day.occupancyRate)}`}>
                        {day.bookedTotal}/{day.totalRooms} · {day.occupancyRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <style>{`
        .admin-page { padding: 40px 24px 80px; }
        .page-sub { color: var(--sage); margin-bottom: 32px; }
        .admin-page section { margin-bottom: 40px; }
        .section-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }

        .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 14px; }
        .stat-card { padding: 16px 18px; }
        .stat-value { font-family: var(--font-display); font-size: 1.5rem; color: var(--ink); }
        .stat-label { font-size: 0.78rem; color: var(--sage); text-transform: uppercase; letter-spacing: 0.04em; margin-top: 4px; }
        .stat-hint { font-size: 0.7rem; color: var(--sage); margin-top: 2px; }

        .hotels-admin-list { display: flex; flex-direction: column; gap: 16px; }
        .hotel-admin-card { padding: 20px 22px; }
        .hotel-admin-card.inactive { opacity: 0.7; }
        .hotel-admin-top { display: flex; gap: 14px; align-items: center; margin-bottom: 10px; flex-wrap: wrap; }
        .hotel-admin-thumb { width: 64px; height: 64px; border-radius: var(--radius); overflow: hidden; flex-shrink: 0; background: var(--ivory); }
        .hotel-admin-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .hotel-admin-title { flex: 1; min-width: 160px; }
        .hotel-admin-title h3 { margin-bottom: 2px; }
        .hotel-admin-city { color: var(--sage); font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.04em; margin-right: 8px; }
        .hotel-admin-actions { display: flex; gap: 8px; }

        .room-types { margin-bottom: 12px; }
        .no-rooms { color: var(--sage); font-size: 0.85rem; }
        .room-type-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr auto;
          gap: 8px;
          align-items: center;
          font-size: 0.84rem;
          padding: 8px 0;
          border-bottom: 1px solid var(--line);
        }
        .room-type-actions { display: flex; gap: 10px; justify-content: flex-end; }
        .btn-link { background: none; border: none; padding: 0; font-size: 0.8rem; font-weight: 600; color: var(--ink); text-decoration: underline; }
        .btn-link-danger { color: var(--danger); }

        .inline-form { padding: 18px; margin-top: 10px; }
        .field-hint { font-size: 0.75rem; color: var(--sage); margin: 4px 0 0; }
        .form-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 6px; }

        .occupancy-controls { display: flex; gap: 16px; align-items: flex-end; padding: 18px; flex-wrap: wrap; }
        .occupancy-controls .field { margin-bottom: 0; min-width: 160px; }
        .occupancy-table-wrap { overflow-x: auto; padding: 6px; }
        .occupancy-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
        .occupancy-table th, .occupancy-table td { padding: 10px 14px; text-align: left; white-space: nowrap; }
        .occupancy-table thead th { color: var(--sage); text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.04em; border-bottom: 1px solid var(--line); }
        .occupancy-table tbody tr:nth-child(odd) { background: var(--ivory); }
        .date-cell { font-weight: 600; }
        .rate-pill { padding: 3px 9px; border-radius: 999px; font-weight: 600; }
        .rate-low { background: #e9f2ec; color: var(--success); }
        .rate-mid { background: #f7f0dd; color: #8a6a1f; }
        .rate-high { background: #f4e9e7; color: var(--danger); }

        .bookings-panel { background: var(--paper); border: 1px solid var(--line); border-radius: var(--radius); padding: 6px 18px 14px; }
        .bookings-panel-head { padding: 12px 0; }
        .booking-rows { display: flex; flex-direction: column; }
        .booking-row { display: flex; justify-content: space-between; align-items: center; gap: 14px; padding: 12px 0; border-top: 1px solid var(--line); flex-wrap: wrap; }
        .booking-row-main { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; font-size: 0.84rem; }
        .booking-row-email { color: var(--sage); font-size: 0.78rem; }
        .pill { padding: 3px 10px; border-radius: 999px; font-size: 0.72rem; font-weight: 700; text-transform: capitalize; }
        .pill-confirmed { background: #e9f2ec; color: var(--success); }
        .pill-cancelled { background: #f4e9e7; color: var(--danger); }
      `}</style>
    </div>
  );
}
