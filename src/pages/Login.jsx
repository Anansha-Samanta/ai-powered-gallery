export default function Login() {
  return (
    <div className="login-page">
      <h1 className="logo">ANDROMEDA</h1>

      <div className="login-card">

        <h2>Login</h2>

        <input
          type="email"
          placeholder="username@gmail.com"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <p className="forgot">Forgot Password?</p>

        <button className="login-btn">
          Sign in
        </button>

        <p className="divider">Or Continue With</p>

        <div className="socials">
          <button>G</button>
          <button>Git</button>
          <button>F</button>
        </div>

        <p className="signup">
          Don't have an account? <span>Register for free</span>
        </p>

      </div>
    </div>
  );
}