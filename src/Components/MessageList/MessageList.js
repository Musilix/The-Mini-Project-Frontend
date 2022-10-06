import { useContext, useEffect, useState } from "react";
import { RelativeDateFormatter } from "../../Utils/RelativeDateFormatter";
import * as MessageWorker from "../../Workers/MessageWorker";
import { AuthContext } from "../AuthContext/AuthContext";
import MessageForm from "../MessageForm/MessageForm";
import "./MessageList.css";

export default function MessageList(props) {
  const [messages, setMessages] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [msgToEdit, setMsgToEdit] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    grabUserMessages();
  }, []);

  const handleEdit = (msgData) => {
    // conditionally display edit component
    setIsModalActive(true);

    setMsgToEdit(msgData);

    // on edit component submission, come back in here and check to make sure this is our 2nd time in header
    // - if so, hide the edit component
  };

  const handleDeletion = (id) => {
    MessageWorker.deleteMessage(id).then(() => {
      grabUserMessages();
    });
  };

  const grabUserMessages = () => {
    MessageWorker.getMessages(props.username)
      .then((messages) => {
        const msgFiller = messages.length > 0 ? messages : null;
        setMessages(msgFiller);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <div>
        <h2 className="message-list-header">{`${props.username}'s Message History`}</h2>
        {messages ? (
          <ul className="results-list">
            {messages.map((messageObj) => {
              return (
                <li key={messageObj.id}>
                  <div className="full-msg-wrap">
                    <div className="message-details">
                      <p className="post-msg">{messageObj.message}</p>
                      <p className="post-date-wrap">
                        {RelativeDateFormatter(messageObj.posting_date)}
                      </p>
                      {user.username === props.username ? (
                        <div className="post-opts-wrap">
                          <p className="edit-post-wrap">Edit Post</p>
                          <p
                            className="del-post-wrap"
                            onClick={() => {
                              handleDeletion(messageObj.id);
                            }}
                          >
                            Delete
                          </p>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>
            Doesn't look like {props.username} has said anything yet! Let's hope
            that changed in the future!
          </p>
        )}
      </div>

      <MessageForm
        isModal={true}
        msgToEdit={msgToEdit}
        isModalActive={isModalActive}
      />
    </div>
  );
}
