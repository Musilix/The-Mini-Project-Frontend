import { Link } from "react-router-dom";

export default function UserBubble() {
  return (
    <div>
      {/* <Link to="/user" element={<UserPage />}> */}
      <img
        src="https://i.imgur.com/fCQHvUP.gif"
        alt="user-img"
        style={{ width: "50px", height: "50px", borderRadius: "999px" }}
      ></img>
      {/* </Link> */}
    </div>
  );
}
