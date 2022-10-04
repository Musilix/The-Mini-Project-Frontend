import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useTextInputState from "../../Hooks/useTextInputState";
// import * as UserService from "../../Services/users";
import * as UserWorker from "../../Workers/UserWorker";
import { AuthContext } from "../AuthContext/AuthContext";

// FUTURE NOTE: in functional components, MAKE SURE you pass in props as an arg to the funciton constructor!!!
export default function SignInForm(props) {
  // NOTE that we use Object destructuring here instead of array destructuring, as we set the value prop on our authcontext provider equal to an object {}, not an array
  const { setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // TODO: Refactor this abomination? Find better way to work with this location obj and props object?
  // Since we're using Links and just normally rendering the SigninForm component in other places
  const signIn = location.state
    ? location.state.signIn ?? true
    : props.signIn ?? true;

  const [username, handleUsernameChange, handleUserNameReset] =
    useTextInputState("");
  const [age, handleAgeChange, handleAgeReset] = useTextInputState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    handleUserNameReset();
    handleAgeReset();

    if (signIn) {
      //* SET USER SESSION IN DB
      // You wanna know how stupid I am? I was doin a boatload of async calls, nested and shit - real deep shit - but should have just broken them down
      //* PREVIOUS
      // await UserService.setUser({ username, age }).then(() =>
      //   setUser(getUserInfo())
      // );

      //* CURRENT
      // I hate sending in the context method setUser, but... ya know..
      UserWorker.signInUser(username, age, setUser);
    } else {
      UserWorker.signUpUser(username, age, setUser);
    }

    navigate("/");
    return;
  };

  return (
    // TODO: Switch to use Formik?
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleUsernameChange}
        placeholder="A name that fits you"
        required
      ></input>
      <input
        type="age"
        name="age"
        value={age}
        onChange={handleAgeChange}
        placeholder="Don't be shy. Tell us how old you are. Or don't..."
      ></input>
      <button>{signIn ? "Sign In" : "Sign Up"}</button>
      <p>{signIn}</p>
    </form>
  );
}
