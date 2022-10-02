import { NavLink } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  const signIn = true;
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
        {/* <li>
          <NavLink
            to="/login"
            className={(state) =>
              state.isActive ? "active-nav" : "active-nav"
            }
            end
          ></NavLink>
        </li> */}
      </ul>
    </nav>
  );
}
