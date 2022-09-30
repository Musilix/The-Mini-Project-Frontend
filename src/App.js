import { Route, Routes } from "react-router-dom";
import "./App.css";
// import MessageList from "./Components/MessageList/MessageList";
import Nav from "./Components/Nav/Nav";
// import SearchForm from "./Components/SearchForm/SearchForm";
import SignInForm from "./Components/SignInForm/SignInForm";
import Splash from "./Components/Splash/Splash";
import UserBubble from "./Components/UserBubble/UserBubble";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id="top-bar-wrap">
          <Nav></Nav>
          <UserBubble />
        </div>
      </header>

      <main>
        <section>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<SignInForm />} />
            {/* <Route path="/:username" element={<UserPage />} /> */}
            {/* <Route path="/:username/messages" element={<MessageList />} /> */}
          </Routes>
        </section>
      </main>
    </div>
  );
}

export default App;
