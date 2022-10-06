import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as UserService from "../../Services/users";
import * as UserWorker from "../../Workers/UserWorker";
import { AuthContext } from "../AuthContext/AuthContext";

export default function UserPage() {
  const { user, setUser } = useContext(AuthContext);
  const [isUs, setIsUs] = useState(null);
  const [userWeLookAt, setUserWeLookAt] = useState({});

  const navigate = useNavigate();
  const { username } = useParams();

  // TODO: Refactor and put in worker class maybe
  const handleLogOut = async () => {
    await UserService.logOutUser();
    setUser(null);

    navigate("/login");
  };

  useEffect(() => {
    whoAreWeLookingAt().then((whoWeAreLookingAt) => {
      const [lookingAt, isUss] = whoWeAreLookingAt;

      setIsUs(isUss);
      setUserWeLookAt(lookingAt);
    });
  }, []);

  const whoAreWeLookingAt = async () => {
    let isUs = null;

    if (!user || username !== user.username) {
      isUs = false;
      // for some reason, when putting the call to usr svc in the array, we need to await the respose.
      // But strangely, if we just straight out only returned the call to the usr svc, it would work properly... weird
      return [await UserWorker.getUserInfo(username), isUs];
    } else if (username === user.username) {
      isUs = true;
      return [user, isUs];
    } else {
      // TODO: 404, usr doesnt exist
    }
  };

  return (
    <div>
      {isUs ? <h1>This is YOUR page!</h1> : <></>}

      <p>
        {isUs ? "Your" : "Their"} name is <b>{userWeLookAt.username}</b>
      </p>

      {userWeLookAt.user_age ? (
        <p>
          {isUs ? "You're" : "They're"} <b>{userWeLookAt.user_age}</b> years
          olds
        </p>
      ) : (
        <p>
          {isUs ? "You" : "They"} haven't told us {isUs ? "your" : "their"} age
          yet
        </p>
      )}

      <p>
        {isUs
          ? "Look back on your past posts"
          : "Curious what they've been saying?"}
      </p>

      <button
        onClick={() => {
          navigate(`/${username}/deeper`);
        }}
      >
        VIEW MESSAGES
      </button>

      {user?.username === userWeLookAt.username ? (
        <button onClick={handleLogOut}>LOG OUT</button>
      ) : (
        <></>
      )}
    </div>
  );
}
