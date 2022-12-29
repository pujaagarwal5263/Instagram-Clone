import {
  collection,
  doc,
  query,
  where,
  getDocs,
  DocumentData,
  addDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase/firebaseConfig";
import { v4 } from "uuid";

const getUserId = async (user: any) => {
  const docQuery = query(collection(db, "users"), where("uid", "==", user.uid));
  let response = await getDocs(docQuery);
  let id = response.docs[0].id;
  return id;
};

const imageUpload = async (imageUpload: File, user: Document) => {
  if (imageUpload !== null) {
    const fileName = imageUpload.name + v4();
    const imageRef = ref(storage, `posts/${fileName}`);
    uploadBytes(imageRef, imageUpload).then(async (res) => {
      const URL = `https://firebasestorage.googleapis.com/v0/b/instagram-clone-39647.appspot.com/o/posts%2F${fileName}?alt=media&token=618d9770-1612-4388-bbbe-313ef3717d3b`;
      getUserId(user).then(async (id: any) => {
        const uploadedPic = await addDoc(collection(db, `users/${id}/posts`), {
          src: [URL],
        });
        const updateDocID = await updateDoc(
          doc(db, `users/${id}/posts/${uploadedPic.id}`),
          { doc_ID: uploadedPic.id }
        );
        const postsCollection = await addDoc(collection(db, "userPosts"), {
          user: user,
          src: [URL],
          doc_ID: uploadedPic.id,
        });
      });
    });
  }

  // console.log(uploadedPic.id);
  // const docRef = doc(db, `users/posts/${uploadedPic.id}`);
  // updateDoc(docRef, { doc_ID: uploadedPic.id }).then((docRef) => {
  //   console.log("doc updated");
  // });

  // const docref = doc(collection(db, 'users'));
  // const colref = collection(docref, 'posts'));
  //  let res = await addDoc(colref, { src: URL,});

  // const readData = onSnapshot(collection(db, "users"), (snapshot) => {
  //   console.log(snapshot.docs);
  // });
};

const addLike = async (docID: any, userID: any) => {
  const docQuery = query(
    collection(db, "userPosts"),
    where("doc_ID", "==", docID)
  );
  let response = await getDocs(docQuery);
  let documentID = response.docs[0].id;
  let documentData = response.docs[0].data().likes;
  const updatedDoc = updateDoc(doc(db, `userPosts/${documentID}`), {
    likes: [...documentData, userID],
  });
};
// const refDoc = doc(db, "users", id);
// console.log(refDoc);
// await setDoc(refDoc, { posts: [URL, ...posts] }, { merge: true });
// console.log(id);
const postDislike = async (docID: any, userID: any) => {
  const docQuery = query(
    collection(db, "userPosts"),
    where("doc_ID", "==", docID)
  );
  let response = await getDocs(docQuery);
  let documentID = response.docs[0].id;
  const updatedDoc = updateDoc(doc(db, `userPosts/${documentID}`), {
    likes: arrayRemove(userID),
  });
};

const setDisplayPicture = async (imageUpload: File, user: Document) => {
  if (imageUpload !== null) {
    const fileName = imageUpload.name + v4();
    const imageRef = ref(storage, `posts/${fileName}`);
    uploadBytes(imageRef, imageUpload).then(async (res) => {
      const URL = `https://firebasestorage.googleapis.com/v0/b/instagram-clone-39647.appspot.com/o/posts%2F${fileName}?alt=media&token=618d9770-1612-4388-bbbe-313ef3717d3b`;
      getUserId(user).then(async (id: any) => {
        const uploadedPic = await updateDoc(doc(db, `users/${id}`), {
          dp: URL,
        });
      });
    });
  }
  return true;
};

interface userPostsInterface {
  dp: string;
  email: string;
  name: string;
  uid: string;
  post: {};
}
const getUsers = async () => {
  let userPosts: userPostsInterface[] = [];
  const usersQuery = query(collection(db, "users"));
  const querySnapshot = await getDocs(usersQuery);
  querySnapshot.forEach((doc: any) => {
    userPosts = [...userPosts, doc.data()];
  });
  return userPosts;
};

const getPosts = async () => {
  let userPosts: DocumentData[] = [];
  const usersQuery = query(collection(db, "userPosts"));
  const querySnapshot = await getDocs(usersQuery);
  querySnapshot.forEach((doc) => {
    userPosts = [...userPosts, doc.data()];
  });
  return userPosts;
};

const userActions = {
  imageUpload,
  getPosts,
  setDisplayPicture,
  getUsers,
  addLike,
  postDislike,
};

export default userActions;
