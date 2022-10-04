import * as UserService from "../Services/users";

// closure this binch
const getCurrentUserInfo = async () => {
  const userInfo = await UserService.getCurrentUser()
    .then((data) => data)
    .catch((e) => console.error(e));

  return userInfo;
};

export async function signInUser(username, user_age, setUser) {
  await UserService.signInUser({ username, user_age })
    .then(() => getCurrentUserInfo())
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

// TODO: Do I need to say "await" here?
export async function getUserInfo(username) {
  return await UserService.getUserDetails(username);
}

export async function getAllLiveUsers() {
  return await UserService.getAllLiveUsers();
}
