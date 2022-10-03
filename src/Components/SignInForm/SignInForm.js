import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useTextInputState from "../../Hooks/useTextInputState";
import * as UserService from "../../Services/users";
import { AuthContext } from "../AuthContext/AuthContext";

// FUTURE NOTE: in functional components, MAKE SURE you pass in props as an arg to the funciton constructor!!!
export default function SignInForm(props) {
  const location = useLocation();
  const navigate = useNavigate();

  // TODO: Refactor this abomination? Find better way to work with this location obj and props object?
  // Since we're using Links and just normally rendering the SigninForm component in other places
  const signIn = location.state
    ? location.state.signIn ?? true
    : props.signIn ?? true;

  const [username, handleUsernameChange, handleUserNameReset] =
    useTextInputState("");
  const [password, handlePasswordChange, handlePasswordReset] =
    useTextInputState("");

  // NOTE that we use Object destructuring here instead of array destructuring, as we set the value prop on our authcontext provider equal to an object {}, not an array
  const { user, setUser } = useContext(AuthContext);

  // TODO: Refactor and put in worker class maybe
  const getUserInfo = async () => {
    // console.log("Trying to set context for user: ");
    // UserService.getUser().then((data) => console.log(data));

    const userInfo = await UserService.getUser()
      .then((data) => data)
      .catch((e) => console.error(e));

    // console.log(`Trying to populate session ctxt with: ${userInfo}`);

    return userInfo;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    handleUserNameReset();
    handlePasswordReset();

    if (signIn) {
      // TODO: Refactor and put in worker class maybe
      // SET USER SESSION IN DB
      // You wanna know how stupid I am? I was doin a boatload of async calls, nested and shit - real deep shit - but should have just broken them down
      // PREVIOUS
      // await UserService.setUser({ username, password }).then(() =>
      //   setUser(getUserInfo())
      // );

      //CURRENT
      await UserService.setUser({ username, password })
        .then(() => getUserInfo())
        .then((newUsrData) => {
          setUser(newUsrData);
        })
        .catch((e) => console.error(e));

      // TODO: Refactor and put in worker class maybe
      // SET USER STATE HERE BY CALLIN BACKEND TO GET SESSION DATA (since cookies are only http only here)
      // await setUser(getUserInfo());

      //reroute after log in/context intiialization
      navigate("/");

      return;
    }

    //do SIGN UP stuff

    return 0;
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleUsernameChange}
        placeholder="A name that fits you"
      ></input>
      <input
        type="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Super secret password"
      ></input>
      <button>{signIn ? "Sign In" : "Sign Up"}</button>
      <p>{signIn}</p>
    </form>
  );
}
