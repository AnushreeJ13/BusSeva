import React, { useState } from "react";

// You can move this CSS to a separate file, like SignInForm.css
const styles = `
/* Base Styles and Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    overflow: hidden;
}

/* Vignette Effect for the entire page */
body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.4);
    z-index: 100;
}

/* Main Container */
.login-container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    box-shadow: 0 32px 64px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2);
    width: 100%;
    max-width: 420px;
    position: relative;
    z-index: 1;
    transform: translateY(50px);
    opacity: 0;
    animation: slideInUp 1s ease forwards 0.3s;
    transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

@keyframes slideInUp {
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.login-container:hover {
    transform: scale(1.01);
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.3);
}

/* Header */
.login-header {
    padding: 48px 32px 32px;
    text-align: center;
    position: relative;
    background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%);
}

.bus-icon {
    font-size: 48px;
    margin-bottom: 16px;
    color: #4f46e5;
}

.logo {
    font-size: 36px;
    font-weight: 800;
    color: #4f46e5;
    margin-bottom: 8px;
    letter-spacing: -1px;
}

.welcome-text {
    color: #64748b;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 4px;
}

.subtitle {
    color: #94a3b8;
    font-size: 14px;
}

/* Form Styles */
.login-form {
    padding: 0 32px 48px;
}

.form-group {
    margin-bottom: 24px;
    position: relative;
    opacity: 0;
    transform: translateX(-20px);
    animation: slideInLeft 0.6s ease forwards;
}

.form-group:nth-child(1) { animation-delay: 0.5s; }
.form-group:nth-child(2) { animation-delay: 0.7s; }

@keyframes slideInLeft {
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.form-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #374151;
    font-size: 14px;
    transition: all 0.3s ease;
}

.input-wrapper {
    position: relative;
}

.form-input {
    width: 100%;
    padding: 16px 20px;
    border: 2px solid #e2e8f0;
    border-radius: 16px;
    font-size: 16px;
    background: #ffffff;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    outline: none;
    color: #1e293b;
}

.form-input:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
    transform: translateY(-2px);
}

/* Password Show/Hide Button */
.toggle-password {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #94a3b8;
    transition: color 0.3s ease;
    font-size: 20px;
    padding: 5px;
    background: transparent;
    border: none;
}

.toggle-password:hover {
    color: #4f46e5;
}

/* Button Styles */
.login-btn {
    width: 100%;
    padding: 18px;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    color: white;
    border: none;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    margin-bottom: 24px;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0;
    transform: translateY(20px);
    animation: slideInUp 0.6s ease forwards 0.9s;
}

.login-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 40px rgba(79, 70, 229, 0.4);
}

.login-btn:active {
    transform: translateY(-1px);
}

/* Forgot Password */
.forgot-password {
    text-align: center;
    margin-bottom: 32px;
    opacity: 0;
    animation: fadeIn 0.6s ease forwards 1.1s;
}

@keyframes fadeIn {
    to { opacity: 1; }
}

.forgot-password a {
    color: #4f46e5;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s ease;
    position: relative;
}

.forgot-password a:hover {
    text-decoration: underline;
}

/* Divider */
.divider {
    position: relative;
    text-align: center;
    margin: 32px 0;
    opacity: 0;
    animation: fadeIn 0.6s ease forwards 1.3s;
}

.divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
}

.divider-text {
    background: rgba(255, 255, 255, 0.95);
    padding: 0 20px;
    color: #64748b;
    font-size: 14px;
    font-weight: 500;
}

/* Social Login */
.social-login {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 32px;
    opacity: 0;
    animation: slideInUp 0.6s ease forwards 1.5s;
}

.social-btn {
    padding: 14px;
    border: 2px solid #e2e8f0;
    background: white;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    gap: 8px;
}

.social-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.google-btn:hover {
    border-color: #4285f4;
    color: #4285f4;
}

.facebook-btn:hover {
    border-color: #1877f2;
    color: #1877f2;
}

/* Signup Link */
.signup-link {
    text-align: center;
    padding-top: 24px;
    border-top: 1px solid #e2e8f0;
    color: #64748b;
    font-size: 14px;
    opacity: 0;
    animation: fadeIn 0.6s ease forwards 1.7s;
}

.signup-link a {
    color: #4f46e5;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s ease;
}

.signup-link a:hover {
    color: #3730a3;
    text-decoration: underline;
}

/* Loading & Success States */
.loading {
    background: linear-gradient(45deg, #94a3b8, #64748b) !important;
    cursor: not-allowed !important;
    transform: none !important;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border: 2px solid transparent;
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: translate(-50%, -50%) rotate(360deg); }
}

.success {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
    animation: successPulse 0.6s ease;
}

@keyframes successPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
}

/* Responsive Design */
@media (max-width: 480px) {
    .login-container {
        border-radius: 20px;
    }
    .login-header {
        padding: 32px 24px 24px;
    }
    .login-form {
        padding: 0 24px 32px;
    }
    .logo {
        font-size: 28px;
    }
}
`;

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${
          type === "success"
            ? "#10b981"
            : type === "error"
            ? "#ef4444"
            : "#4f46e5"
        };
        color: white;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

const SignInForm = () => {
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const btn = e.target.querySelector("#loginBtn");
    const email = e.target.querySelector("#email").value;
    const password = e.target.querySelector("#password").value;

    if (email && password) {
      btn.classList.add("loading");
      btn.innerHTML = "";

      setTimeout(() => {
        btn.classList.remove("loading");
        btn.classList.add("success");
        btn.innerHTML = "Welcome Aboard! 🎉";

        showNotification("Login successful! Welcome to BusSeva!", "success");

        setTimeout(() => {
          btn.classList.remove("success");
          btn.innerHTML = "Sign In";
        }, 2000);
      }, 2500);
    }
  };

  const handleInputAnimation = (e) => {
    const input = e.target;
    const label = input.closest(".form-group").querySelector(".form-label");
    if (input.value.length > 0) {
      input.style.borderColor = "#4f46e5";
      label.style.color = "#4f46e5";
    } else {
      input.style.borderColor = "#e2e8f0";
      label.style.color = "#374151";
    }
  };

  return (
    <React.Fragment>
      <style>{styles}</style>
      <div className="login-container">
        <div className="login-header">
          <div className="bus-icon">🚌</div>
          <div className="logo">BusSeva</div>
          <div className="welcome-text">Welcome back!</div>
          <div className="subtitle">Sign in to continue your journey</div>
        </div>

        <form className="login-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address
            </label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter your email"
                required
                onInput={handleInputAnimation}
                onFocus={(e) =>
                  (e.target.closest(".input-wrapper").style.transform =
                    "translateY(-2px)")
                }
                onBlur={(e) =>
                  (e.target.closest(".input-wrapper").style.transform =
                    "translateY(0)")
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="input-wrapper">
              <input
                type={passwordType}
                id="password"
                className="form-input"
                placeholder="Enter your password"
                required
                onInput={handleInputAnimation}
                onFocus={(e) =>
                  (e.target.closest(".input-wrapper").style.transform =
                    "translateY(-2px)")
                }
                onBlur={(e) =>
                  (e.target.closest(".input-wrapper").style.transform =
                    "translateY(0)")
                }
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePassword}
              >
                {passwordType === "password" ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn" id="loginBtn">
            Sign In
          </button>

          <div className="forgot-password">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                showNotification("Redirecting to password recovery...", "info");
              }}
            >
              Forgot your password?
            </a>
          </div>

          <div className="divider">
            <span className="divider-text">Or continue with</span>
          </div>

          <div className="social-login">
            <button
              type="button"
              className="social-btn google-btn"
              onClick={() =>
                showNotification("Signing in with Google...", "info")
              }
            >
              <span>
                <img
                  src="https://img.icons8.com/color/24/000000/google-logo.png"
                  alt="Google"
                />
              </span>{" "}
              Google
            </button>
            <button
              type="button"
              className="social-btn facebook-btn"
              onClick={() =>
                showNotification("Signing in with Facebook...", "info")
              }
            >
              <span>
                <img
                  src="https://img.icons8.com/fluency/24/000000/facebook-new.png"
                  alt="Facebook"
                />
              </span>{" "}
              Facebook
            </button>
          </div>

          <div className="signup-link">
            New to BusSeva?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                showNotification("Redirecting to sign up page...", "info");
              }}
            >
              Create an account
            </a>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SignInForm;
