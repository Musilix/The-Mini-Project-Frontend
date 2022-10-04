// import { Link } from "react-router-dom";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import "./UserBubble.css";

export default function UserBubble() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <ul className="user-det-nav">
        <li className="usr-bubble-img-wrap">
          <Link className="usr-prof-link" to="/login">
            <img
              // TODO: grab usr img from s3 bucket? user.profile_picture
              src="https://i.imgur.com/QD54tFG.jpeg"
              alt="user-img"
              style={{ width: "50px", height: "50px", borderRadius: "999px" }}
            />
            {user ? (
              <span>
                logged in {user.username ? `as ${user.username}` : ""}
              </span>
            ) : (
              <></>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
}
