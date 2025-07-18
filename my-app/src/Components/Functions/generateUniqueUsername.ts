import { db } from "@/Firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

// دالة لتوليد username عشوائي من الاسم
function generateUsername(name: string) {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${name.toLowerCase().replace(/\s/g, '')}${randomNum}`;
}

// التحقق من عدم تكرار الـ username
async function isUsernameUnique(username: string) {
  const querySnapshot = await getDocs(collection(db, "users"));
  let exists = false;

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data?.username === username) {
      exists = true;
    }
  });

  return !exists;
}

// الدالة الرئيسية التي تنشئ وتُخزن username
export async function genareteUniqueUsername(userEmail: string, displayName: string) {
  let username;
  let unique = false;

  while (!unique) {
    username = generateUsername(displayName);
    unique = await isUsernameUnique(username);
  }

  const userRef = doc(db, "users", userEmail);
  await updateDoc(userRef, {
    username: username,
  });

  return username;
}
