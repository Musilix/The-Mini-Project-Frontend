export function createMessage(message) {
  return fetch("http://localhost:8080/messages", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      ...message,
    }),
  }).then((res) => res.json());
}

export function getMessage() {}

export function getMessages() {}

export function deleteMessage() {}

export function deleteAllMessages() {}

export function editMessage() {}
