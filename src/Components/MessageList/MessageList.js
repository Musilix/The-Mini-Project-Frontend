import { Component } from "react";
import { RelativeDateFormatter } from "../../Utils/RelativeDateFormatter";
import * as MessageWorker from "../../Workers/MessageWorker";
import "./MessageList.css";

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    MessageWorker.getMessages(this.props.username)
      .then((messages) => {
        const msgFiller = messages.length > 0 ? messages : null;
        this.setState((prevState) => {
          return {
            messages: msgFiller,
          };
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  render() {
    return (
      <div>
        <h2 className="message-list-header">{`${this.props.username}'s Message History`}</h2>
        {this.state.messages ? (
          <ul className="results-list">
            {this.state.messages.map((messageObj) => {
              return (
                <li>
                  <p className="post-msg">{messageObj.message}</p>
                  <p className="post-date-wrap">
                    {RelativeDateFormatter(messageObj.posting_date)}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>
            Doesn't look like {this.props.username} has said anything yet! Let's
            hope that changed in the future!
          </p>
        )}
      </div>
    );
  }
}
