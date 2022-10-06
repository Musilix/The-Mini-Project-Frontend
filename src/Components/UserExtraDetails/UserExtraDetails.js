import { useParams } from "react-router-dom";
import MessageList from "../MessageList/MessageList";

export function UserExtraDetails(props) {
  const { username } = useParams();

  return (
    <div>
      <h2>
        Feeling extra curious about <b>{username}</b>?
      </h2>

      <p>Well, take a look at who they follow</p>
      <ul>
        <li>JonJon</li>
        <li>JonJon</li>
        <li>JonJon</li>
      </ul>

      <p>Or maybe the messages they've posted</p>
      <MessageList username={username} />
    </div>
  );
}
