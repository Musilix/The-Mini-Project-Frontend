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

  useEffect(() => {
    // TODO: CHANGE THIS EXPEDITIOUSLY... awful hacky way to utilize our custom userTextInputState hook for both manual msg sets + textarea evt triggered msg sets
    if (props.isEditing && props.msgToEdit) {
      const e = { target: { value: props.msgToEdit.message } };

      setMessage(e);
    }
  }, []);

  const handleMsgSub = (e) => {
    e.preventDefault();

    setMsgOutcome(null);
    setLoading(true);

    //TODO: return just the worker call, then append the then(),catch(), and finally() calls...
    if (!props.isEditing) {
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
    } else {
      // check if new msg is different from old one - make call to db if so
      if (message !== props.msgToEdit.message) {
        // if so, call worker
        MessageWorker.editMessage({ ...props.msgToEdit, message })
          .then(() => {
            // use closure prop method to edit parents isEditing state, so we can hide the edit textarea and show the actual msg again

            props.handleFinishedEdit({ ...props.msgToEdit, message });
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

        return;
      }

      // just bypass the Message Worker call. go through the rest of the process though
      props.handleFinishedEdit({ ...props.msgToEdit });
      setMsgOutcome(true);
      setLoading(false);
      setTimeout(() => {
        setMsgOutcome(null);
      }, 1500);

      return;
    }

    resetMessage();
  };

  const handleMsgChange = (e) => {
    setMessage(e);
  };

  return (
    <div className={props.isEditing ? "" : ""}>
      <form>
        <textarea
          className="msg-input"
          name="message"
          value={message}
          onChange={handleMsgChange}
          placeholder="What would you like to say?"
          required
        ></textarea>
        <button className="msg-sub-butt" onClick={handleMsgSub}>
          {!props.isEditing ? "POST" : "SAVE"}
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
