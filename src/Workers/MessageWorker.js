import * as MessageService from "../Services/messages";

export function createMessage(message) {
  // first do any extra stuff
  // console.log("We have a message: ");
  // console.log({ ...message });

  // then call strict business logic
  // handle error checking here, but let whoever calls this method handle the error itself, as it could be different in different contexts
  return MessageService.createMessage(message).then((res) => {
    if (res.ok === true) {
      return res;
    }

    throw new Error("Failed to post your message");
  });
}

export function getMessages(username) {
  return MessageService.getMessages(username).then((res) => {
    if (res.ok === true) {
      return res;
    }

    throw new Error(`Failed to grab ${username} messages`);
  });
}

export function editMessage() {}

export function deleteMessage() {}

export function deleteAllMessages() {}
