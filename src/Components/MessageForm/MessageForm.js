import { useContext, useEffect, useState } from "react";
import useTextInputState from "../../Hooks/useTextInputState";
import * as MessageWorker from "../../Workers/MessageWorker";
import { AuthContext } from "../AuthContext/AuthContext";
import "./MessageForm.css";

export default function MessageForm(props) {
  const [message, setMessage, resetMessage] = useTextInputState("");
  const { user } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [msgOutcome, setMsgOutcome] = useState(null);

  // useEffect(() => {
  //   console.log(props);
  //   if (props?.isModal && props?.msgToEdit) {
  //     setMessage(props.msgToEdit.message);
  //   }
  // }, []);

  const handleMsgSub = (e) => {
    e.preventDefault();

    setMsgOutcome(null);
    setLoading(true);

    // FUTURE NOTE: no need to use async await syntax as the fetch api allows us to handle res from async and use our callbacks to set state variables
    MessageWorker.createMessage({ user, message })
      .then(() => {
        setMsgOutcome(true);
      })
      .catch((e) => {
        setMsgOutcome(false);
      })
      .finally(() => {
        setLoading(false);

        // hide msg outcome after a few secs... user doesnt need to know that theyre message was succesfully for ever
        setTimeout(() => {
          setMsgOutcome(null);
        }, 1500);
      });

    resetMessage();
  };

  const handleMsgChange = (e) => {
    setMessage(e);
  };

  return (
    <div
      className={
        (props.isModal ? "modal-mode" : "") +
        " " +
        (props.isModalActive ? "active-modal" : "disabled-modal")
      }
    >
      <form>
        <input
          className="msg-input"
          name="message"
          value={message}
          onChange={handleMsgChange}
          placeholder="What would you like to say?"
          required
        ></input>
        <button className="msg-sub-butt" onClick={handleMsgSub}>
          POST
        </button>
      </form>

      {/*  THIS IS NASTTTTTTTTTY */}

      {isLoading ? (
        <div className="loading-wrap">
          <i className="fas fa-circle-notch fa-spin fa-4x"></i>
          {/* <img src="./Assets/loading.svg" alt="loading-screen" /> */}
        </div>
      ) : (
        <></>
      )}

      {msgOutcome !== null ? (
        msgOutcome ? (
          <p>Rest easy! Your message was posted</p>
        ) : (
          <p>
            Something sadly failed. Your message didn't make it :( Try again?
          </p>
        )
      ) : (
        <></>
      )}
    </div>
  );
}
