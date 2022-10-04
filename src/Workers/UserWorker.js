import * as UserService from "../Services/users";

// closure this binch
const getUserInfo = async () => {
  const userInfo = await UserService.getUser()
    .then((data) => data)
    .catch((e) => console.error(e));

  return userInfo;
};

export async function signInUser(username, user_age, setUser) {
  await UserService.signInUser({ username, user_age })
    .then(() => getUserInfo())
    .then((newUsrData) => {
      setUser(newUsrData);
    })
    .catch((e) => console.error(e));
}

export async function signUpUser(username, user_age, setUser) {
  await UserService.signUpUser({ username, user_age })
    .then(() => signInUser(username, user_age, setUser))
    .catch((e) => console.error(e.message));
}
