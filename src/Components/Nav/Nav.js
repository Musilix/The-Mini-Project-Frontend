import { useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import "./Nav.css";

export default function Nav() {
  const signIn = true;
  const { user } = useContext(AuthContext);
  // let navLoginOrUser = useRef(<></>);

  // useEffect(() => {
  //   const handleStrangeUserBehavior = async () => {
  //     await user;
  //     console.log(await user);
  //   };

  //   handleStrangeUserBehavior();

  //   return;
  // }, [user]);

  return (
    <nav>
      <ul id="navlink-list">
        <li className="navlink-element">
          <NavLink
            to="/"
            className={(state) =>
              state.isActive ? "active-nav" : "active-nav"
            }
            end
          >
            HOME
          </NavLink>
        </li>

        {!user ? (
          <li className="navlink-element">
            <NavLink
              to="/login"
              className={(state) =>
                state.isActive ? "active-nav" : "active-nav"
              }
              state={{ signIn }}
              end
            >
              LOGIN
            </NavLink>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
}
