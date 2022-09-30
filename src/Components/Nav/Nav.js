import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
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
        <li>
          <NavLink
            to="/login"
            className={(state) =>
              state.isActive ? "active-nav" : "active-nav"
            }
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
