// import { Link } from "react-router-dom";

import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import SignInForm from "../SignInForm/SignInForm";
import Splash from "../Splash/Splash";
// import UserPage from "../UserPage/UserPage";
import "./UserBubble.css";

export default function UserBubble() {
  return (
    <div className="usr-bubble-img-wrap">
      <Link
        to={Cookies.get("qid") ? "/user" : "/login"}
        element={Cookies.get("qid") ? <Splash /> : <SignInForm signIn={true} />}
      >
        <img
          src="https://i.imgur.com/QD54tFG.jpeg"
          alt="user-img"
          style={{ width: "50px", height: "50px", borderRadius: "999px" }}
        ></img>
      </Link>
    </div>
  );
}
