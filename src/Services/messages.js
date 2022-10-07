const getOpts = (method, content) => {
  const baseOpts = {
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  if ((method === "POST" || method === "PUT") && content) {
    return {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...content }),
      ...baseOpts,
    };
  } else if ((method === "GET" || method === "DELETE") && !content) {
    return {
      method: method,
      ...baseOpts,
    };
  } else {
    return {
      message:
        "You must provide some fetch method + a corresponding content, depending on request type",
    };
  }
};

export function createMessage(message) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/messages`,
    getOpts("POST", message)
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error("Failed to post your message");
  });
}

export function getMessage() {}

export function getMessages(username) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/${username}/messages`,
    getOpts("GET")
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }

    // handle error checking here, but let whoever calls this method handle the error itself, as it could be different in different contexts
    throw new Error(`Failed to get ${username}'s message`);
  });
}

export function deleteMessage(messageId) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/messages/${messageId}`,
    getOpts("DELETE")
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }

    throw new Error(
      "The message you tried to delete doesn't exist. Maybe it was already deleted?"
    );
  });
}

export function deleteAllMessages() {}

export function editMessage(messageObj) {
  console.log(`trying to send this: ${JSON.stringify(messageObj)}`);
  return fetch(
    `${process.env.REACT_APP_API_URL}/message/${messageObj.id}`,
    getOpts("PUT", { message: messageObj.message })
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }

    throw new Error("There was an issue updating your message... sorry");
  });
}
