import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <div className="landing-container">
        <div className="landing-logo" />
        <nav className="landing-navbar">
          <ul>
            <li>Product</li>
            <li>Register</li>
            <li>Pricing</li>
            <li>Contact</li>
          </ul>
        </nav>

        <div className="intro-bckgd-square">
          <div className="intro-text">
            <div className="intro-text-header">
              Get things done with Clean flow
            </div>
            <div className="intro-text-list">
              <ul>
                <li>Plan Your Strategy</li>
                <li>Prioritize Tasks</li>
                <li>Share Ideas</li>
                <li>Manage Resources</li>
                <li>Increase Productivity</li>
                <li>Hit Your Targets!</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="auth-container">
          <form className="auth-form">
            <div className="form-header">
              <span>Log in</span>
            </div>

            <div className="form-login">
              <div class="login-input-container">
                <p>email</p>
                <input
                  className="login-input"
                  type="text"
                  name="email"
                  placeholder="Your email"
                />
              </div>

              <div class="login-input-container">
                <p>password</p>
                <input
                  className="password-input"
                  type="text"
                  name="password"
                  placeholder="Your password"
                />
              </div>

              <div className="forgot-pass">
                {/*currently redirects to Landing Page*/}
                <a href='/' className="forgot-pass-link">Forgot password?</a>
              </div>

              <div className="auth-btn">
                <span>Log In</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Landing;
