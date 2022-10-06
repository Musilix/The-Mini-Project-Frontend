import { useParams } from "react-router-dom";
import MessageList from "../MessageList/MessageList";
import "./UserExtraDetails.css";

export function UserExtraDetails(props) {
  const { username } = useParams();

  return (
    <div className="extra-det-wrap">
      <h2 className="extra-det-header">
        Feeling extra curious about <b>{username}</b>?
      </h2>
      <p>
        Take a look at what they've been saying! Or what they've been liking...
      </p>

      {/* <LikesList username={username} */}
      <MessageList username={username} />
    </div>
  );
}
