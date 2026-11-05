import { useState, type FormEvent } from 'react';
import styles from './Field.module.css';
import { cx } from './cx';

// Pure validators: return an error message, or '' when the value is fine.
function validateEmail(value: string): string {
  if (!value) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return 'Enter a valid email address';
  return '';
}

function validatePassword(value: string): string {
  if (!value) return 'Password is required';
  if (value.length < 8) return 'At least 8 characters';
  if (!/[a-z]/.test(value)) return 'Needs a lowercase letter';
  if (!/[A-Z]/.test(value)) return 'Needs an uppercase letter';
  if (!/\d/.test(value)) return 'Needs a digit';
  return '';
}

export default function ValidationDemo() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Show an error only after the user has left the field (or tried to submit).
  const [touched, setTouched] = useState({ email: false, password: false });
  const [submitted, setSubmitted] = useState(false);

  // Derived state: no need to store errors, just compute them on each render.
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const showEmailError = touched.email && emailError;
  const showPasswordError = touched.password && passwordError;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setSubmitted(!emailError && !passwordError);
  }

  return (
    <div>
      <h3>Validation states (email + password)</h3>
      <form onSubmit={handleSubmit} noValidate>
        <label className={styles.field}>
          Email
          <input
            type="email"
            className={cx(
              styles.input,
              touched.email && (emailError ? styles.invalid : styles.valid),
            )}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            aria-invalid={!!showEmailError}
          />
          {showEmailError && <p className={styles.error}>{emailError}</p>}
        </label>

        <label className={styles.field}>
          Password
          <input
            type="password"
            className={cx(
              styles.input,
              touched.password && (passwordError ? styles.invalid : styles.valid),
            )}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            aria-invalid={!!showPasswordError}
          />
          {showPasswordError && <p className={styles.error}>{passwordError}</p>}
        </label>

        <button type="submit">Sign up</button>
        {submitted && <p>Looks good!</p>}
      </form>
    </div>
  );
}
