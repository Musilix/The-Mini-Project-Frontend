import { Component } from "react";
import MessageList from "../MessageList/MessageList";

export default class MessageSearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      messages: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // *********************************************************************
  // Shared functionality for form type components
  handleChange(e) {
    this.setState((prevState) => {
      return {
        [e.target.name]: e.target.value,
      };
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/${this.state.username}/messages`)
      .then((res) => res.json())
      .then((parsedRes) => {
        this.setState((prevState) => {
          return {
            userMessages: [...parsedRes],
          };
        });
      })
      .catch((e) => {
        // show error message element in form element
        console.info(e);
      });
    //call backend with the given parametersLimit
  }
  // *********************************************************************

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            name="username"
            type="text"
            onChange={this.handleChange}
            value={this.state.id}
            placeholder="Search for User Messages"
          ></input>
          <button>Search</button>
        </form>

        <MessageList
          username={this.state.username}
          messages={this.state.messages}
        ></MessageList>
      </div>
    );
  }
}
