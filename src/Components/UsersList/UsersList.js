import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as UserWorker from "../../Workers/UserWorker";
import "./UserList.css";

export function UsersList() {
  //get users
  //loop through them and create clickable elements for eahc
  // * add pagination for when there are a lot of users

  // do we really need to keep this in the state? It wont be updating in real time
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    UserWorker.getAllLiveUsers().then((users) => {
      setActiveUsers(users);
    });
  }, []);

  return (
    <div className="users-list-wrap">
      <h2>Check out who else is currently on The Mini Project!</h2>
      <ul className="user-list">
        {activeUsers.map((user) => {
          return (
            <div key={user.user_id}>
              <Link className="user-profile-link" to={`/${user.username}`}>
                <li className="user-element">
                  <div className="user-ele-content">
                    <img
                      className="user-pro-pic"
                      src="https://i.imgur.com/QD54tFG.jpeg"
                      alt={`${user.username}'s profile picture'}`}
                    />
                    <div className="user-sneak-peek">
                      <p className="user-username">{user.username}</p>
                      <p className="user-userage">
                        {user.user_age
                          ? `${user.user_age} years old`
                          : "They keep their age a secret"}
                      </p>
                    </div>
                  </div>
                </li>
              </Link>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
