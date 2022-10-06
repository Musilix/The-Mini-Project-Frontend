import { Component } from "react";
import * as MessageWorker from "../../Workers/MessageWorker";

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
        this.setState((prevState) => {
          return {
            messages: messages,
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
        <h2>{`${this.props.username}'s Message History`}</h2>
        <ul className="results-list">
          {this.state.messages.map((messageObj) => {
            return (
              <li>
                <p>{messageObj.message}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
