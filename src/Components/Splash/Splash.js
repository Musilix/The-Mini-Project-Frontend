import { Link } from "react-router-dom";
import "./Splash.css";

export default function Splash() {
  const signIn = false;
  return (
    <div id="splash-content-wrap">
      <h1>Welcome to the Mini Project</h1>
      <h3>The Project about Nothing</h3>
      <p>
        Feel free to make an account, make some messages, and look at what other
        users are saying! That's all there is to it... easy enough, right?
      </p>

      <Link className="create-acct-btn" to="/login" state={{ signIn }}>
        <p>Create Account</p>
      </Link>
    </div>
  );
}
