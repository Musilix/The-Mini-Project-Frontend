import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../Services/users";
import { AuthContext } from "../AuthContext/AuthContext";

export default function UserPage() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // TODO: Refactor and put in worker class maybe
  const handleLogOut = async () => {
    await UserService.logOutUser();
    setUser(null);

    navigate("/login");
  };

  return (
    <div>
      <h1>This is YOUR page!</h1>
      <p>
        Your name is <b>{user.username}</b>
      </p>
      {user.user_age ? (
        <p>
          You're <b>{user.user_age}</b> years olds
        </p>
      ) : (
        <p>You haven't told us your age yet</p>
      )}

      <p>And you're messages are ...</p>
      <p>yipee!</p>

      {user ? <button onClick={handleLogOut}>LOG OUT</button> : <></>}
      {/* <button onClick={handleLogOut}>LOG OUT</button> */}
    </div>
  );
}
