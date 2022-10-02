// import { Link } from "react-router-dom";

import "./UserBubble.css";

export default function UserBubble() {
  return (
    <div className="usr-bubble-img-wrap">
      {/* <Link to="/user" element={<UserPage />}> */}
      <img
        src="https://i.imgur.com/QD54tFG.jpeg"
        alt="user-img"
        style={{ width: "50px", height: "50px", borderRadius: "999px" }}
      ></img>
      {/* </Link> */}
    </div>
  );
}
