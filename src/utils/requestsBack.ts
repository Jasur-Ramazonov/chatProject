import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, database, db } from "./firebase.config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import {
  DataSnapshot,
  onValue,
  push,
  ref,
  remove,
  update,
} from "firebase/database";

export function createAuth(data: { email: string; password: string }) {
  return createUserWithEmailAndPassword(auth, data.email, data.password);
}

export function checkUser(data: { email: string; password: string }) {
  return signInWithEmailAndPassword(auth, data.email, data.password);
}

export function registerUser(data: { email: string; password: string }) {
  return addDoc(collection(db, "users"), data);
}

export function getUsers() {
  return getDocs(collection(db, "users"));
}

export function getMessages(func: (snapshot: DataSnapshot) => void) {
  onValue(ref(database, "messages"), func);
}

export function sendMessage(data: {
  body: string;
  sender: string;
  receiver: string;
}) {
  return push(ref(database, "messages"), data);
}

export function editMessage(
  data: {
    body: string;
    sender: string;
    receiver: string;
  },
  id: string
) {
  return update(ref(database, `messages/${id}`), data);
}

export function deleteMessage(
  e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
  id: string
) {
  e.preventDefault();
  return remove(ref(database, `messages/${id}`));
}

export function logOut() {
  console.log("salom");
  return deleteUser(auth.currentUser!);
}

export function deleteMyUser(id: string) {
  return deleteDoc(doc(db, `users/${id}`));
}
