import * as MessageService from "../Services/messages";

export function createMessage(message) {
  // first do any extra stuff - reference UserWorker to see example of "extra" stuff

  // then call strict business logic
  // pass up any res or error that the svc sends out
  return MessageService.createMessage(message);
}

export function getMessages(username) {
  return MessageService.getMessages(username);
}

export function editMessage(msgObj) {
  return MessageService.editMessage(msgObj);
}

export function deleteMessage(messageId) {
  return MessageService.deleteMessage(messageId);
}

export function deleteAllMessages() {}
