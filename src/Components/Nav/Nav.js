import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import "./Nav.css";

export default function Nav() {
  const signIn = true;
  const { user } = useContext(AuthContext);

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
            to="/users"
            className={(state) =>
              state.isActive ? "active-nav" : "active-nav"
            }
            end
          >
            USERS
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
          <>
            <li className="navlink-element">
              <NavLink
                to="/create"
                className={(state) =>
                  state.isActive ? "active-nav" : "active-nav"
                }
                state={{ signIn }}
                end
              >
                CREATE POST
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
