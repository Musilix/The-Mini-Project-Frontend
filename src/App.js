import { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./Components/AuthContext/AuthContext";
import { MessageForm } from "./Components/MessageForm/MessageForm";
import Nav from "./Components/Nav/Nav";
import SignInForm from "./Components/SignInForm/SignInForm";
import Splash from "./Components/Splash/Splash";
import UserBubble from "./Components/UserBubble/UserBubble";
import { UserExtraDetails } from "./Components/UserExtraDetails/UserExtraDetails";
import UserPage from "./Components/UserPage/UserPage";
import { UsersList } from "./Components/UsersList/UsersList";
import * as UserService from "./Services/users";

function App() {
  // When we navigate to this page, we should refresh what we have stored in the user state val
  // shared in the authcontext. Call useEffect() to check status on cookie in backend session store
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  // TODO: abstract out to some worker or facade class
  //******************************************************* */
  const getCurrentUserInfo = async () => {
    const userInfo = await UserService.getCurrentUser()
      .then((data) => data)
      .catch((e) => console.error(e));

    return userInfo;
  };
  //******************************************************* */

  useEffect(() => {
    getCurrentUserInfo()
      .then((data) => {
        // is this the best practice? No probably...
        if (data) {
          // THIS WAS A NECESSITY.
          /* I was trying to send just "...data" to the setUser hook method, but I needed
            /* to wrap it in an object (or array - obj in my case) in order for it to be properly 
            /* destructured into the user state variable 
            */
          setUser({ ...data });
        }
      })
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((e) => console.error(e));
  }, []); // <======== we need to make sure we specify useEffect to not have any dependencies that make it run. It hsould only run on initial load. Leaving deps field blank causes the DB to be infinitely called

  return (
    // TODO: determine if we need to switch this back to how it used to be... seems to be better than bfore
    <>
      {isLoading ? (
        <div className="loading-wrap">
          <i className="fas fa-circle-notch fa-spin fa-4x"></i>
          {/* <img src="./Assets/loading.svg" alt="loading-screen" /> */}
        </div>
      ) : (
        <>
          <div className="App">
            <header className="App-header">
              <div id="top-bar-wrap">
                <Nav></Nav>
                <UserBubble />
              </div>
            </header>

            <main>
              <section className="splash-section">
                <Routes>
                  <Route
                    path="/"
                    element={<Splash className="splash-wrap" />}
                  />
                  <Route
                    path="/login"
                    element={
                      user ? (
                        <Navigate replace to={`/${user.username}`} />
                      ) : (
                        <SignInForm />
                      )
                    }
                  />

                  <Route
                    path="/:username"
                    // element={
                    //   !user ? <Navigate replace to="/login" /> : <UserPage />
                    // }

                    element={<UserPage />}
                  />

                  <Route
                    path="/create"
                    element={user ? <MessageForm /> : <SignInForm />}
                  />
                  <Route path="/users" element={<UsersList />}></Route>
                  <Route
                    path="/:username/deeper"
                    element={<UserExtraDetails />}
                  ></Route>
                </Routes>
              </section>
            </main>
          </div>
        </>
      )}
    </>
  );
}

export default App;
