import { Component } from "react";
import useTextInputState from "../../Hooks/useTextInputState";

// export default class FormBase extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       messages: [],
//     };

//     this.handleChange = this.handleChange.bind(this);
//     // this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   render() {
//     return <div>

//     </div>;
//   }
// }

export default function FormBase() {
  // login
  const [username, changeUsername] = useTextInputState("");
  const [password, changePassword] = useTextInputState("");

  //search messages
  const [userToSearch, changeUserToSearch] = useTextInputState("");

  return (
    <div>
      <form onSubmit={handleSubmit}></form>
    </div>
  );
}

function handleSubmit(e) {
  e.preventDefault();

  // call login route

  // or call msg search route
}
