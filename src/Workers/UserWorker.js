import * as UserService from "../Services/users";

const getUserInfo = async () => {
  const userInfo = await UserService.getUser()
    .then((data) => data)
    .catch((e) => console.error(e));

  return userInfo;
};

export async function signInUser(username, password, setUser) {
  await UserService.signInUser({ username, password })
    .then(() => getUserInfo())
    .then((newUsrData) => {
      setUser(newUsrData);
    })
    .catch((e) => console.error(e));
}

export async function signUpUser(username, password, setUser) {
  await UserService.signUpUser({ username, password })
    .then(() => signInUser(username, password, setUser))
    .catch((e) => console.error(e.message));
}
