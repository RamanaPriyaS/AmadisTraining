const API_URL = import.meta.env.VITE_API_URL || "/api";
const TOKEN_KEY = "hb_token";

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
  else sessionStorage.removeItem(TOKEN_KEY);
}

async function request(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (networkErr) {
    const err = new Error("Could not reach the server. Please check your connection and try again.");
    err.status = 0;
    throw err;
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
  }

  if (!res.ok) {
    const message = data?.message || data?.error || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const api = {
  register: (payload) => request("/auth/register", { method: "POST", body: payload, auth: false }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload, auth: false }),
  me: () => request("/auth/me"),

  listHotels: (params = {}) => {
    const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v !== undefined && v !== ""));
    const suffix = qs.toString() ? `?${qs.toString()}` : "";
    return request(`/hotels${suffix}`, { auth: false });
  },
  getHotel: (id, params = {}) => {
    const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v !== undefined && v !== ""));
    const suffix = qs.toString() ? `?${qs.toString()}` : "";
    return request(`/hotels/${id}${suffix}`, { auth: false });
  },
  myHotels: () => request("/my-hotels"),
  createHotel: (payload) => request("/hotels", { method: "POST", body: payload }),
  updateHotel: (id, payload) => request(`/hotels/${id}`, { method: "PUT", body: payload }),
  setHotelActive: (id, isActive) => request(`/hotels/${id}/active`, { method: "PATCH", body: { isActive } }),
  createRoom: (hotelId, payload) => request(`/hotels/${hotelId}/rooms`, { method: "POST", body: payload }),
  updateRoom: (hotelId, roomId, payload) =>
    request(`/hotels/${hotelId}/rooms/${roomId}`, { method: "PUT", body: payload }),
  deleteRoom: (hotelId, roomId) => request(`/hotels/${hotelId}/rooms/${roomId}`, { method: "DELETE" }),

  // --- Rooms ---
  getRoomAvailability: (roomId, checkIn, checkOut) =>
    request(`/rooms/${roomId}/availability?checkIn=${checkIn}&checkOut=${checkOut}`, { auth: false }),
  getRoomPriceQuote: (roomId, checkIn, checkOut) =>
    request(`/rooms/${roomId}/price-quote?checkIn=${checkIn}&checkOut=${checkOut}`, { auth: false }),

  // --- Bookings ---
  createBooking: (payload) => request("/bookings", { method: "POST", body: payload }),
  myBookings: () => request("/bookings/me"),
  cancelBooking: (id) => request(`/bookings/${id}/cancel`, { method: "POST" }),

  // --- Admin ---
  occupancy: (hotelId, startDate, endDate) =>
    request(`/admin/occupancy?hotelId=${hotelId}&startDate=${startDate}&endDate=${endDate}`),
  hotelBookings: (hotelId, status) =>
    request(`/admin/bookings?hotelId=${hotelId}${status ? `&status=${status}` : ""}`),
  dashboardSummary: () => request("/admin/dashboard"),
};

export default api;
