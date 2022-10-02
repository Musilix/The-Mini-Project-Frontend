import { useLocation } from "react-router-dom";
import useTextInputState from "../../Hooks/useTextInputState";

// FUTURE NOTE: in functional components, MAKE SURE you pass in props as an arg to the funciton constructor!!!
export default function SignInForm(props) {
  const location = useLocation();

  // TODO: Refactor this abomination? Find better way to work with this location obj and props object?
  // Since we're using Links and just normally rendering the SigninForm component in other places
  const signIn = location.state
    ? location.state.signIn ?? true
    : props.signIn ?? true;

  const [username, handleUsernameChange, handleUserNameReset] =
    useTextInputState("");
  const [password, handlePasswordChange, handlePasswordReset] =
    useTextInputState("");

  const onSubmit = (e) => {
    e.preventDefault();

    handleUserNameReset();
    handlePasswordReset();

    console.log(`You are ${username} and your password is ${password}`);

    if (signIn) {
      //do sign in stuff

      return 1;
    }

    //do sign up stuff

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
