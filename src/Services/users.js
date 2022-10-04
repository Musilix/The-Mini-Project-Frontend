// TODO: switch host for backend calls to use eenv variable
export function getCurrentUser() {
  return fetch("http://localhost:8080/whoami", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
  }).then((res) => res.json());
}

export function signInUser(user) {
  // console.log(`user details are: ${JSON.stringify(user)}`);
  return fetch("http://localhost:8080/iam", {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // NEED to stringify!
    body: JSON.stringify({
      ...user,
    }), // body data type must match "Content-Type" header
  }).then((res) => res.json());
}

export function logOutUser() {
  return fetch("http://localhost:8080/iamnomore", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
  }).then((res) => res.json());
}

export function signUpUser(user) {
  return fetch("http://localhost:8080/users", {
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
      ...user,
    }),
  }).then((res) => res.json());
}

export function getUserDetails(username) {
  return fetch(`http://localhost:8080/${username}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).then((res) => res.json());
}

export function getUserMessages(username) {}

export function getAllLiveUsers() {
  return fetch(`http://localhost:8080/users`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).then((res) => res.json());
}
