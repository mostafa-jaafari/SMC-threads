import { db } from "@/Firebase";
import { doc, getDoc } from "firebase/firestore";





export async function GetUserInfos(useremail : string){
    const DocRef = doc(db, 'users', useremail);
    const DocSnap = (await getDoc(DocRef)).data();
    return DocSnap;
}