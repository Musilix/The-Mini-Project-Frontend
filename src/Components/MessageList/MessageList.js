import { useContext, useEffect, useState } from "react";
import { RelativeDateFormatter } from "../../Utils/RelativeDateFormatter";
import * as MessageWorker from "../../Workers/MessageWorker";
import { AuthContext } from "../AuthContext/AuthContext";
import MessageForm from "../MessageForm/MessageForm";
import "./MessageList.css";

export default function MessageList(props) {
  const [messages, setMessages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [msgToEditIds, setMsgToEditIds] = useState([]);

  const { user } = useContext(AuthContext);

  // grab all a users messages on load
  useEffect(() => {
    grabUserMessages();
  }, []);

  // TODO: combine these two edit methods...
  const handleEdit = (msgData) => {
    setIsEditing(true);
    setMsgToEditIds([...msgToEditIds, msgData.id]);
  };

  const handleFinishedEdit = (msgObj) => {
    setIsEditing(false);
    setMsgToEditIds(msgToEditIds.splice(msgToEditIds.indexOf(msgObj), 1));

    const msgsWithLocalEdit = messages.map((msg) => {
      if (msg.id === msgObj.id) {
        return msgObj;
      }

      return msg;
    });

    // edit the existing msg with the changes, so we dont have to actually make a db call until refresh... could this be dangerous?
    setMessages(msgsWithLocalEdit);
  };

  const handleDeletion = (id) => {
    MessageWorker.deleteMessage(id).then(() => {
      grabUserMessages();
    });
  };

  const grabUserMessages = () => {
    MessageWorker.getMessages(props.username)
      .then((messages) => {
        const msgFiller = messages.length > 0 ? messages : null; //need to do this for conditional checks on msgs below...
        setMessages(msgFiller);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <h2 className="message-list-header">{`${props.username}'s Message History`}</h2>
      {messages ? (
        <ul className="results-list">
          {messages.map((messageObj) => {
            return (
              <li key={messageObj.id}>
                <div className="full-msg-wrap">
                  <div className="message-details">
                    {isEditing && msgToEditIds.includes(messageObj.id) ? (
                      <MessageForm
                        isEditing={true}
                        msgToEdit={messageObj}
                        handleFinishedEdit={handleFinishedEdit}
                      />
                    ) : (
                      <p className="post-msg">{messageObj.message}</p>
                    )}

                    <div className="post-time-details">
                      <p className="post-date-wrap">
                        Posted {RelativeDateFormatter(messageObj.posting_date)}
                      </p>

                      {messageObj.edit_date !== null &&
                      messageObj.edit_date !== messageObj.posting_date ? (
                        <p className="edit-date-wrap">{`Edited ${RelativeDateFormatter(
                          messageObj.edit_date
                        )}`}</p>
                      ) : (
                        <></>
                      )}
                    </div>

                    {/* TODO: abstract out msg options to its own component? */}
                    {user?.username === props.username ? (
                      <div className="post-opts-wrap">
                        <p
                          className="edit-post-wrap"
                          onClick={() => handleEdit(messageObj)}
                        >
                          Edit Post
                        </p>
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
  );
}
