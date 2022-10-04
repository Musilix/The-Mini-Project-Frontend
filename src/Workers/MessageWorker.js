import * as MessageService from "../Services/messages";

export async function createMessage(message) {
  //do any extra stuff
  console.log("We have a message: ");
  console.log({ ...message });

  //call strict business logic
  return await MessageService.createMessage(message);
}

export function editMessage() {}

export function deleteMessage() {}

export function deleteAllMessages() {}
