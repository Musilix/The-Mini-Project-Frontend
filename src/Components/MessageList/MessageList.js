import { Component } from "react";

export default class MessageList extends Component {
  render() {
    return (
      <ul className="results-list">
        {this.props.messages.map((messageObj) => {
          return (
            <li>
              <div>
                <h2>{`${this.props.username}'s Message History`}</h2>
                <p>{messageObj.message}</p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}
