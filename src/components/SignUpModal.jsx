import { useState, useEffect } from "react";

export default function SignUpModal({ onClose, onSubmit }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (username.trim().length < 2) {
      newErrors.username = "Min 2 characters";
    }
    if (!email.includes("@")) {
      newErrors.email = "Enter a valid e-mail";
    }
    if (password.length < 6) {
      newErrors.password = "Min 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onSubmit({ username: username.trim(), email: email });
  };

  return (
    <div
      className="modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <form className="modal_box" onSubmit={handleSubmit}>
        <h2 className="modal_title">Sign up</h2>

        <label className="modal_field">
          <span className="modal_label">Username</span>
          <input
            className="modal_input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <span className="modal_error">{errors.username}</span>
          )}
        </label>

        <label className="modal_field">
          <span className="modal_label">E-Mail</span>
          <input
            className="modal_input"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="modal_error">{errors.email}</span>}
        </label>

        <label className="modal_field">
          <span className="modal_label">Password</span>
          <input
            className="modal_input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="modal_error">{errors.password}</span>
          )}
        </label>

        <button className="modal_submit" type="submit">
          Sign up
        </button>

        <p className="modal_login">
          Already have an account? <a href="#login">Log In</a>
        </p>
      </form>
    </div>
  );
}
