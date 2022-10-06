const getOpts = (method, content) => {
  const baseOpts = {
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  if (method === "POST" && content) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...content }),
      ...baseOpts,
    };
  } else if (method === "GET" && !content) {
    return {
      method: "GET",
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

export function deleteMessage() {}

export function deleteAllMessages() {}

export function editMessage() {}
