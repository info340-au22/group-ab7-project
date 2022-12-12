import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, child, get, update } from "firebase/database";

export async function getUserInfo(userId) {
  const db = getDatabase();
  const dbRef = ref(getDatabase());
  console.log(userId);
  let returnValue;
  await get(child(dbRef, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        returnValue = {
          name: snapshot.val().name,
          avatar: snapshot.val().avatar,
        };
      } else {
        console.log("No data available");
        returnValue = { name: "Anonymous", avatar: "/img/default-avatar.jpg" };
      }
    })
    .catch((error) => {
      console.error(error);
    });
  console.log(returnValue);
  return returnValue;
}

export function UpdateUser(user) {
  console.log(user);
  const db = getDatabase();
  update(ref(db, `users/${user.uid}`), {
    name: user.displayName,
    avatar: user.photoURL !== null ? user.photoURL : "/img/default-avatar.jpg",
  });
}
