import { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthContext } from "./Components/AuthContext/AuthContext";
import Nav from "./Components/Nav/Nav";
import SignInForm from "./Components/SignInForm/SignInForm";
import Splash from "./Components/Splash/Splash";
import UserBubble from "./Components/UserBubble/UserBubble";
import UserPage from "./Components/UserPage/UserPage";
import * as UserService from "./Services/users";

function App() {
  // When we navigate to this page, we should refresh what we have stored in the user state val
  // shared in the authcontext. Call useEffect() to check status on cookie in backend session store
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  // TODO: Refactor and put in worker class maybe
  useEffect(() => {
    UserService.getUser()
      .then((data) => {
        // is this the best practice? No probably...
        if (data) {
          setUser(...data);
        }
      })
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <div className="loading-wrap">
          <i className="fas fa-circle-notch fa-spin fa-4x"></i>
          {/* <img src="./Assets/loading.svg" alt="loading-screen" /> */}
        </div>
      ) : (
        <>
          <header className="App-header">
            <div id="top-bar-wrap">
              <Nav></Nav>
              <UserBubble />
            </div>
          </header>

          <p>{JSON.stringify(user)}</p>
          <main>
            <section className="splash-section">
              <Routes>
                <Route path="/" element={<Splash className="splash-wrap" />} />
                <Route
                  path="/login"
                  element={
                    user ? <Navigate replace to="/user" /> : <SignInForm />
                  }
                />
                <Route
                  path="/user"
                  element={
                    !user ? <Navigate replace to="/login" /> : <UserPage />
                  }
                />
              </Routes>
            </section>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
