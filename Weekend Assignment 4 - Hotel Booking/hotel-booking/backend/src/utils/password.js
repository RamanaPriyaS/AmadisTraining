export const PASSWORD_MIN_LENGTH = 8;

const COMMON_PASSWORDS = new Set([
  "password", "password1", "password123", "12345678", "123456789",
  "qwerty123", "letmein1", "welcome1", "admin123", "iloveyou1",
]);

export function validatePasswordStrength(password, { name, email } = {}) {
  if (typeof password !== "string") {
    return { valid: false, message: "Password is required" };
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return { valid: false, message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters` };
  }
  if (password.length > 128) {
    return { valid: false, message: "Password is too long" };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Password must include a lowercase letter" };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must include an uppercase letter" };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must include a number" };
  }
  if (COMMON_PASSWORDS.has(password.toLowerCase())) {
    return { valid: false, message: "This password is too common — please choose another" };
  }
  const lowerPw = password.toLowerCase();
  if (email && lowerPw.includes(email.toLowerCase().split("@")[0])) {
    return { valid: false, message: "Password must not contain your email address" };
  }
  if (name && name.trim().length > 2 && lowerPw.includes(name.trim().toLowerCase())) {
    return { valid: false, message: "Password must not contain your name" };
  }
  return { valid: true };
}

export const MAX_FAILED_LOGIN_ATTEMPTS = 5;
export const LOCKOUT_DURATION_MS = 15 * 60 * 1000;
