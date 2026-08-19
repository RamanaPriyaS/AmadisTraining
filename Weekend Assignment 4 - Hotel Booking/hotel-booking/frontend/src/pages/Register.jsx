import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function checkPasswordRules(password, name, email) {
  const rules = [
    { key: "length", label: "At least 8 characters", pass: password.length >= 8 },
    { key: "lower", label: "A lowercase letter", pass: /[a-z]/.test(password) },
    { key: "upper", label: "An uppercase letter", pass: /[A-Z]/.test(password) },
    { key: "number", label: "A number", pass: /[0-9]/.test(password) },
  ];
  const lower = password.toLowerCase();
  const containsIdentity =
    (email && lower.includes(email.toLowerCase().split("@")[0]) && email.length > 0) ||
    (name && name.trim().length > 2 && lower.includes(name.trim().toLowerCase()));
  return { rules, containsIdentity, allPass: rules.every((r) => r.pass) && !containsIdentity };
}

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "guest" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const strength = useMemo(
    () => checkPasswordRules(form.password, form.name, form.email),
    [form.password, form.name, form.email]
  );
  const passwordsMatch = form.confirmPassword.length === 0 || form.confirmPassword === form.password;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!strength.allPass) {
      setError("Please meet all password requirements below.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    try {
      const user = await register(form.name.trim(), form.email.trim(), form.password, form.role);
      navigate(user.role === "hotel_admin" ? "/admin" : "/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container auth-page">
      <div className="card auth-card">
        <h2>Create your account</h2>
        <p className="auth-sub">Book stays as a guest, or list a property as a hotel admin.</p>

        {error && <div className="banner banner-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="password-field">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button type="button" className="show-pw-btn" onClick={() => setShowPassword((s) => !s)} tabIndex={-1}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {form.password.length > 0 && (
              <ul className="pw-rules">
                {strength.rules.map((r) => (
                  <li key={r.key} className={r.pass ? "pass" : ""}>
                    <span className="pw-rule-dot">{r.pass ? "✓" : "•"}</span> {r.label}
                  </li>
                ))}
                <li className={!strength.containsIdentity ? "pass" : ""}>
                  <span className="pw-rule-dot">{!strength.containsIdentity ? "✓" : "•"}</span> Doesn't contain your name or email
                </li>
              </ul>
            )}
          </div>
          <div className="field">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            />
            {!passwordsMatch && <p className="field-error">Passwords don't match yet.</p>}
          </div>
          <div className="field">
            <label htmlFor="role">I am a…</label>
            <select id="role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="guest">Guest — booking a stay</option>
              <option value="hotel_admin">Hotel admin — managing a property</option>
            </select>
          </div>
          <button className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>

      <style>{`
        .auth-page { display: flex; justify-content: center; padding: 64px 24px; }
        .auth-card { width: 100%; max-width: 420px; padding: 36px; }
        .auth-sub { color: var(--sage); font-size: 0.88rem; }
        .auth-switch { text-align: center; margin-top: 18px; font-size: 0.88rem; color: var(--sage); }
        .auth-switch a { color: var(--brass); font-weight: 600; }

        .password-field { position: relative; }
        .password-field input { padding-right: 56px; }
        .show-pw-btn {
          position: absolute; right: 6px; top: 50%; transform: translateY(-50%);
          background: none; border: none; font-size: 0.76rem; font-weight: 700;
          color: var(--sage); padding: 4px 8px;
        }
        .show-pw-btn:hover { color: var(--ink); }

        .pw-rules { list-style: none; margin: 8px 0 0; padding: 0; font-size: 0.78rem; color: var(--sage); }
        .pw-rules li { padding: 2px 0; display: flex; align-items: center; gap: 6px; }
        .pw-rules li.pass { color: var(--success); }
        .pw-rule-dot { width: 14px; display: inline-block; text-align: center; }
        .field-error { color: var(--danger); font-size: 0.78rem; margin: 4px 0 0; }
      `}</style>
    </div>
  );
}
